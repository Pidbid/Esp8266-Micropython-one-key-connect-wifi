<template>

    <view class="flex flex-col flex-col-top-start">
        <view class="flex flex-row flex-row-top-start" style="flex-wrap:wrap" :style="{width:width+'rpx'}">
            <view  class="ma-5" v-for="(item,index) in _filelist" :key="index" :style="{width:(itemWidth-10)+'rpx'}">
                <tm-sheet :round="2" color="primary" text :transprent="true" :padding="[0,0]" :margin="[0,0]" class=" "  >
                    <tm-image :round="2"  :allowDelete="false" @delete="deletedFile(item)"  extra delete :src="item.url" :width="itemWidth-10" :height="itemHeight-10">
                        <template v-slot:extra>
                            <view :style="{background:'rgba(0, 0, 0, 0.7)',width:(itemWidth-10)+'rpx'}" :class="[`round-b-${2}`]" class="py-4 px-4 flex flex-row flex-row-center-start">
                                <tm-icon :font-size="23" v-if="item.statusCode==0||item.statusCode==1" color="grey-3"  name="tmicon-clock-fill"></tm-icon>
                                <tm-text v-if="item.statusCode==0||item.statusCode==1" color="grey-3"  _class="pl-5" :font-size="23" :label="item.status"></tm-text>
                                <tm-icon :font-size="23" v-if="item.statusCode==2||item.statusCode==4" color="red" name="tmicon-times-circle-fill"></tm-icon>
                                <tm-text v-if="item.statusCode==2||item.statusCode==4" color="red"  _class="pl-5" :font-size="23" :label="item.status"></tm-text>
                                <tm-icon :font-size="23" v-if="item.statusCode==3" color="green" name="tmicon-check-circle-fill"></tm-icon>
                                <tm-text v-if="item.statusCode==3"  color="green" _class="pl-5" :font-size="23" :label="item.status"></tm-text>
                            </view>
                        </template>
                    </tm-image>
                </tm-sheet>
            </view>
            <view v-if="!_disabledAdd"  class="ma-5" :style="{width:(itemWidth-10)+'rpx'}">
                <tm-sheet :round="2"  @click="chooseFile" color="primary" text :padding="[0,0]" :margin="[0,0]" _class="flex-center" :height="itemHeight-10" >
                     <tm-icon :font-size="42" :userInteractionEnabled="false" name="tmicon-plus"></tm-icon>
                </tm-sheet>
            </view>

        </view>
    </view>
    
</template>
<script lang="ts" setup>
/**
 * 上传
 * @description 图片上传组件。
 */
import { computed ,ref,PropType, Ref, watch, nextTick,getCurrentInstance,inject  } from 'vue'
import {file,fileConfig,statusCode,uploadfile} from "./upload"
import tmImage from '../tm-image/tm-image.vue';
import tmText from '../tm-text/tm-text.vue';
import tmIcon from '../tm-icon/tm-icon.vue';
import tmSheet from '../tm-sheet/tm-sheet.vue';
const {proxy} = getCurrentInstance();
const props = defineProps({
    width:{
        type:Number,
        default:700
    },
    //一行排列几个。
    rows:{
        type:Number,
        default:5
    },
    //图片的高度
    imageHeight:{
        type:Number,
        default:140
    },
    defaultValue:{
        type:Array as PropType<Array<file>>,
        default:()=>[]
    },
    //可以是双向绑定
    modelValue:{
        type:Array as PropType<Array<file>>,
        default:()=>[]
    },
    color:{
        type:String,
        default:"primary"
    },
    header:{
        type:Object,
        default:()=>{}
    },
    formData:{
        type:Object,
        default:()=>{}
    },
    maxFile:{
        type:Number,
        default:9
    },
    maxSize:{
        type:Number,
        default:10*1024*1024
    },
    url:{
        type:String,
        default:"",
        required:true
    },
    autoUpload:{
        type:Boolean,
        default:true
    },
    disabled:{
        type:Boolean,
        default:false
    },
    //删除前执行，如果返回false,将阻止删除。
    onRemove:{
        type:[Function,Boolean],
        default:()=>{
            return (item:file)=>true
        }
    },
    //开始上传前执行，如果返false，将阻止上传，
    onStart:{
        type:[Function,Boolean],
        default:()=>{
            return (item:file)=>true
        }
    },
    //上传成功后，从服务器响应后立即执行，此时，还未更改当前文件上传的状态，是成功还是失败
    //如果此时返回false,将会让文件状态从成功改为上传失败，尽管 从服务器正确返回，但仍然显示失败。
    onSuccessAfter:{
        type:[Function,Boolean],
        default:()=>{
            return (item:file)=>true
        }
    },
    //选择文件前执行，如果此时返回false,将阻止选择文件。你可以在这里做一些上传前的配置。
    beforeChooese:{
        type:[Function,Boolean],
        default:()=>{
            return (item:file)=>true
        }
    }
})
/**
 * emits 事件说明
 * @method succcess 一个文件上传成功后立即执行， 返回：file,fileList
 * @method fail 一个文件上传失败后立即执行， 返回：file,fileList
 * @method complete 所有文件上传完成， 返回：file,fileList
 * @method change 文件列表增加或者减少,文件状态的改变， 返回：file,fileList
 * @method remove 一个文件被移除时触发。file,fileList
 * @method uploadComplete i当前任务所有文件上传结束时触发。fileList
 */
const emits = defineEmits(["success","fail","complete","change","remove","uploadComplete","update:modelValue"])

const itemWidth = computed(()=>{
    return props.width / props.rows
})
const itemHeight = computed(()=>{
    return props.imageHeight
})
const _filelist:Ref<Array<file>> = ref([])
const _disabledAdd = computed(()=>{
    return props.disabled||_filelist.value.length>=props.maxFile;
})
const _uploadObj = new uploadfile({hostUrl:props.url,autoUpload:props.autoUpload,fileList:addSuccess(props.defaultValue),header:props.header,formData:props.formData,maxFile:props.maxFile,maxSize:props.maxSize})
_filelist.value = [..._uploadObj.filelist];
emits("update:modelValue",_filelist.value)

watch([()=>props.header,()=>props.maxFile,()=>props.maxSize,()=>props.formData],()=>{
    _uploadObj.setConfig({hostUrl:props.url,header:props.header,formData:props.formData,maxFile:props.maxFile,maxSize:props.maxSize})
},{deep:true})
//添加已上传文件列表。
function addSuccess(fileList:Array<file>= []){
    
    let fl = fileList.map(e=>{
        let _itemfile:file = {url:""};
        if(typeof e == 'string'){
            _itemfile.url = e;
        }else{
            _itemfile = {...e};
        }
        _itemfile = {..._itemfile,statusCode:statusCode.success,status:'上传成功',progress:100}
        return _itemfile
    })
    return fl;
}

//选择图片前执行。
_uploadObj.beforeChooesefile = async function () {
    _uploadObj.setConfig({maxFile:props.maxFile - _filelist.value.length})
    if (typeof props.beforeChooese === 'function') {
        let p = await props.beforeChooese();
        if(typeof p === 'function'){
            p = await p();
        }
        if (!p) return false;
    }
    return true
}
//上传成功后，即将更新文件状态前执行，如果返回false，文件将标记为失败，尽管已经上传成功。
_uploadObj.beforeSuccess = async function (item:file) {
    if (typeof props.onSuccessAfter === 'function') {
        let p = await props.onSuccessAfter(item);
        if(typeof p === 'function'){
            p = await p(item);
        }
        if (!p) return false;
    }
    return true
}
//开始上传前执行。
_uploadObj.beforeStart = async function (item:file) {
    if (typeof props.onStart === 'function') {
        let p = await props.onStart(item);
        if(typeof p === 'function'){
            p = await p(item);
        }
        if (!p) return false;
    }
    return true
}
//任何一个文件上传结束时都会触发。
_uploadObj.complete = function(item:file){
    emits("complete",item,_filelist.value);
    emits("update:modelValue",_filelist.value)
	pushFormItem(true)
}
//自动监听加入已上传文件到列表中。
watch(()=>props.modelValue,()=>{
	if(props.modelValue.length==0){
		_filelist.value = [];
		_uploadObj.filelist = [];
	}else{
		_uploadObj.addFile(addSuccess(props.modelValue))
		_filelist.value = [..._uploadObj.filelist]
	}
    
})
_uploadObj.uploadComplete = function(filelist){
    emits("uploadComplete",filelist);
}
_uploadObj.success = function(item,fileList){
     let index =  _filelist.value.findIndex(el=>el.uid==item.uid)
    if(index>-1){
		 _filelist.value.splice(index,1,item)
		 emits("success",item,_filelist.value)
		 emits("change",_filelist.value)
	}
}
_uploadObj.fail = function(item){
	let index =  _filelist.value.findIndex(el=>el.uid==item.uid)
	if(index>-1){
		 _filelist.value.splice(index,1,item)
		 emits("fail",item,_filelist.value)
		 emits("change",_filelist.value)
	}
	
}
function chooseFile(){
    _uploadObj.chooesefile().then(fileList=>{
        const fl = uni.$tm.u.deepClone(fileList);
        _filelist.value.push(...fl)
        emits("change",fl)
        emits("update:modelValue",fl)
    })
}

async function deletedFile(item:file){
    if (typeof props.onRemove === 'function') {
        let p = await props.onRemove(item);
        if(typeof p === 'function'){
            p = await p(item);
        }
        if (!p) return false;
    }
   _filelist.value = _uploadObj.delete(item);
   emits("remove",item)
   emits("change",_filelist.value)
   pushFormItem()
    
}



/** -----------form专有------------ */
//父级方法。
const rulesObj = inject("tmFormItemRules",computed<rulesItem>(()=>{
    return {
        message:"请选择",
        required:false,
        validator:false
    }
}))
//父级方法。
let parentFormItem = proxy.$parent
while (parentFormItem) {
    if (parentFormItem?.tmFormComnameFormItem == 'tmFormComnameFormItem' || !parentFormItem) {
        break;
    } else {
        parentFormItem = parentFormItem?.$parent ?? undefined
       
    }
}

async function pushFormItem(isCheckVail = true){
    if(parentFormItem){
        let isRe = false;
		let successFile = _filelist.value.filter(el=>el.statusCode===3);
        if(isCheckVail&&rulesObj.value?.required===true){
            if(typeof rulesObj.value.validator == 'function'){
                isRe =await !rulesObj.value.validator(_filelist.value)
            }else if(typeof rulesObj.value.validator == 'boolean'){
                isRe =  rulesObj.value.validator;
            }
            if(typeof rulesObj.value.validator !== 'function'){
                isRe = successFile.length==0
            }
        }else{
            isRe = successFile.length==0
        }
		
        parentFormItem.pushCom({
            value:successFile,
            isRequiredError:isRe,//true,错误，false正常 检验状态
            componentsName:'tm-upload',//表单组件类型。
            message:rulesObj.value.message,//检验信息提示语。
        })
    }
}
pushFormItem(false)

const tmFormFun = inject("tmFormFun",computed(()=>""))
watch(tmFormFun,()=>{
    if(tmFormFun.value=='reset'){
		_filelist.value = [];
		_uploadObj.filelist = [];
		emits('update:modelValue',[])
		pushFormItem(false)
    }
})

/** -----------end------------ */
</script>