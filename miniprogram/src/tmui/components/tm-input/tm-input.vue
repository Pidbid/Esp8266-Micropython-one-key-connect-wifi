<template>
    <tm-sheet :transprent="true" :margin="props.margin" :padding="props.padding">

        <tm-sheet :transprent="props.transprent" :round="props.round" no-level :margin="[0, 0]" :padding="_inputPadding"
            :border="props.border" :text="props.text" :color="_color" :outlined="props.outlined">
            <view class="flex flex-row "
                :class="[propsDetail.type == 'textarea' ? 'flex-row-top-center' : 'flex-row-center-center']"
                :style="[{ height: `${_height}rpx` }]">

                <view v-if="propsDetail.search || propsDetail.searchLabel" class="px-9"></view>
                <slot name="left"></slot>
                <view v-if="propsDetail.prefix" class="pr-16">
                    <tm-icon :font-size="propsDetail.fontSize" :name="propsDetail.prefix"></tm-icon>
                </view>
                <view v-if="propsDetail.prefixLabel" class="pr-24">
                    <tm-text :font-size="propsDetail.fontSize" :label="propsDetail.prefixLabel"></tm-text>
                </view>

                <view v-if="!isAndroid" @click="emits('click', $event)" class="flex-1 relative flex-row flex"
                    :style="[{ width: '0px' }]">
                    <!-- <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: `${_height}rpx`,background:'red'}"></view> -->
                    <input class="flex-1" :userInteractionEnabled="false" v-if="propsDetail.type != 'textarea'"
                        :value="_value" @focus="focus" @blur="blur" @confirm="confirm" @input="inputHandler"
                        @keyboardheightchange="emits('keyboardheightchange')" :password="showPasswordText"
                        :maxlength="propsDetail.maxlength" :disabled="propsDetail.disabled"
                        :cursorSpacing="propsDetail.cursorSpacing" :confirmType="propsDetail.confirmType"
                        :confirmHold="propsDetail.confirmHold" :autoBlur="propsDetail.autoBlur"
                        :holdKeyboard="propsDetail.holdKeyboard" :adjustPosition="propsDetail.adjustPosition"
                        :type="propsDetail.type" :placeholder="propsDetail.placeholder" :style="[
                            {
                                height: `${_height}rpx`,
                                color: propsDetail.fontColor ? propsDetail.fontColor : tmcomputed.textColor,
                                'text-align': props.align,
                                'fontSize': `${propsDetail.fontSize_px}px`
                            },
                        ]" :placeholder-style="`fontSize:${propsDetail.fontSize_px}px`" />

                    <textarea :userInteractionEnabled="false" v-if="propsDetail.type == 'textarea'" :value="_value"
                        @focus="focus" @blur="blur" @confirm="confirm" @input="inputHandler"
                        @keyboardheightchange="emits('keyboardheightchange')" :maxlength="propsDetail.maxlength"
                        :password="showPasswordText" :disabled="propsDetail.disabled"
                        :placeholder="propsDetail.placeholder" :cursorSpacing="propsDetail.cursorSpacing"
                        :confirmType="propsDetail.confirmType" :confirmHold="propsDetail.confirmHold"
                        :autoBlur="propsDetail.autoBlur" :holdKeyboard="propsDetail.holdKeyboard"
                        :adjustPosition="propsDetail.adjustPosition" :type="propsDetail.type" :style="[
                            {
                                height: `${_height}rpx`, width: 'auto', 'word-break': 'break-word',
                                color: propsDetail.fontColor ? propsDetail.fontColor : tmcomputed.textColor,
                                'text-align': props.align,
                                'fontSize': `${propsDetail.fontSize_px}px`
                            },
                        ]" class="wrap flex-1 py-12"
                        :placeholder-style="{ 'fontSize': `${propsDetail.fontSize_px}px` }"></textarea>
                </view>
                <view v-if="isAndroid" class="flex-1 relative flex-row flex " :style="[{ width: '0px' }]">
                    <!-- <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: `${_height}rpx`,background:'red'}"></view> -->
                    <input class="flex-1" @click="emits('click', $event)" :userInteractionEnabled="false"
                        v-if="propsDetail.type != 'textarea'" :value="_value" @focus="focus" @blur="blur"
                        @confirm="confirm" @input="inputHandler" @keyboardheightchange="emits('keyboardheightchange')"
                        :password="showPasswordText" :disabled="propsDetail.disabled"
                        :cursorSpacing="propsDetail.cursorSpacing" :confirmType="propsDetail.confirmType"
                        :confirmHold="propsDetail.confirmHold" :autoBlur="propsDetail.autoBlur"
                        :holdKeyboard="propsDetail.holdKeyboard" :adjustPosition="propsDetail.adjustPosition"
                        :maxlength="propsDetail.maxlength" :type="propsDetail.type"
                        :placeholder="propsDetail.placeholder" :style="[
                            {
                                height: `${_height}rpx`,
                                color: propsDetail.fontColor ? propsDetail.fontColor : tmcomputed.textColor,
                                'text-align': props.align,
                                'fontSize': `${propsDetail.fontSize_px}px`
                            },
                        ]" :placeholder-style="`fontSize:${propsDetail.fontSize_px}px`" />

                    <textarea @click="emits('click', $event)" :userInteractionEnabled="false"
                        v-if="propsDetail.type == 'textarea'" :value="_value" @focus="focus" @blur="blur"
                        @confirm="confirm" @input="inputHandler" @keyboardheightchange="emits('keyboardheightchange')"
                        :password="showPasswordText" :disabled="propsDetail.disabled"
                        :placeholder="propsDetail.placeholder" :cursorSpacing="propsDetail.cursorSpacing"
                        :confirmType="propsDetail.confirmType" :confirmHold="propsDetail.confirmHold"
                        :autoBlur="propsDetail.autoBlur" :holdKeyboard="propsDetail.holdKeyboard"
                        :adjustPosition="propsDetail.adjustPosition" :maxlength="propsDetail.maxlength"
                        :type="propsDetail.type" :style="[
                            {
                                height: `${_height}rpx`, width: 'auto', 'word-break': 'break-word',
                                color: propsDetail.fontColor ? propsDetail.fontColor : tmcomputed.textColor,
                                'text-align': props.align,
                                'fontSize': `${propsDetail.fontSize_px}px`
                            },
                        ]" class="wrap flex-1 py-10"
                        :placeholder-style="{ 'fontSize': `${propsDetail.fontSize_px}px` }"></textarea>
                </view>
                <view class="pl-16" v-if="propsDetail.showClear && _valueLenChar > 0">
                    <tm-icon @click="clearBtn" :font-size="propsDetail.fontSize * 0.9" name="tmicon-times-circle-fill">
                    </tm-icon>
                </view>
                <view class="pl-16" v-if="_requiredError">
                    <tm-icon :font-size="propsDetail.fontSize" name="tmicon-exclamation-circle"></tm-icon>
                </view>
                <view class="pl-16" v-if="propsDetail.suffix">
                    <tm-icon :font-size="propsDetail.fontSize * 0.85" :name="propsDetail.suffix"></tm-icon>
                </view>


                <view v-if="propsDetail.suffixLabel" class="pl-16">
                    <tm-text :font-size="propsDetail.fontSize" :label="propsDetail.suffixLabel"></tm-text>
                </view>


                <view class="pl-16" v-if="showPasswordIcon">
                    <!-- tmicon-eyeslash-fill -->
                    <tm-icon @click="changeSeePassword" :font-size="propsDetail.fontSize"
                        :name="showPasswordText ? 'tmicon-eyeslash-fill' : 'tmicon-eye-fill'"></tm-icon>
                </view>
                <view v-if="propsDetail.showCharNumber && _valueLenChar > 0 && propsDetail.type != 'textarea'"
                    class=" pl-16 flex-row flex">
                    <tm-text :label="_valueLenChar"></tm-text>
                    <tm-text v-if="propsDetail.maxlength > 0" :label="'/' + propsDetail.maxlength"></tm-text>
                </view>
                <view v-if="propsDetail.showCharNumber && _valueLenChar > 0 && propsDetail.type == 'textarea'"
                    class=" pl-16 flex-row flex absolute r-0 b-12">
                    <tm-text :label="_valueLenChar"></tm-text>
                    <tm-text v-if="propsDetail.maxlength > 0" :label="'/' + propsDetail.maxlength"></tm-text>
                </view>
                <slot name="right">
                    <view v-if="propsDetail.search || propsDetail.searchLabel" class="pl-16">
                        <TmButton @click="searchClick" :color="props.focusColor" :font-size="24" :height="_height - 11"
                            :padding="[16, 0]" block :margin="[0, 0]" :icon="propsDetail.search"
                            :label="propsDetail.searchLabel"></TmButton>
                    </view>
                </slot>
            </view>
        </tm-sheet>

        <!-- <view v-if="propsDetail.showBottomBotder" :class="[`mt-${props.margin[1]*2}`]">
            <tm-divider :margin="[0,0]"></tm-divider>
        </view> -->
        <!-- _requiredError -->
        <!-- <view v-if="false" class="pt-12">
            <tmText :font-size="24" color="red" :label="_errorLabel"></tmText>
        </view> -->
    </tm-sheet>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, watch, getCurrentInstance, inject } from 'vue';
import { inputPushItem, rulesItem } from "./../tm-form-item/interface"
import tmSheet from '../tm-sheet/tm-sheet.vue';
import tmIcon from '../tm-icon/tm-icon.vue';
import tmText from '../tm-text/tm-text.vue';
import { custom_props, computedTheme, computedClass, computedStyle, computedDark } from '../../tool/lib/minxs';
import { useTmpiniaStore } from '../../tool/lib/tmpinia';
import TmButton from '../tm-button/tm-button.vue';
const store = useTmpiniaStore();
const emits = defineEmits(["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", 'click'])
const { proxy } = getCurrentInstance()
const props = defineProps({
    ...custom_props,
    color: {
        type: String,
        default: 'grey-4'
    },
    //激活时的主题配色。
    focusColor: {
        type: String,
        default: 'primary'
    },
    //默认使用自动配色
    fontColor: {
        type: String,
        default: ''
    },
    text: {
        type: Boolean,
        default: true
    },
    outlined: {
        type: Boolean,
        default: false
    },
    border: {
        type: Number,
        default: 0
    },
    transprent: {
        type: Boolean,
        default: false
    },
    round: {
        type: Number,
        default: 3
    },
    margin: {
        type: Array as PropType<Array<number>>,
        default: () => [0, 0]
    },
    padding: {
        type: Array as PropType<Array<number>>,
        default: () => [0, 0]
    },
    height: {
        type: Number,
        default: 64
    },
    //前缀图标
    prefix: {
        type: String,
        default: ''
    },
    //前缀文字
    prefixLabel: {
        type: String,
        default: ''
    },
    //后缀图标
    suffix: {
        type: String,
        default: ''
    },
    //后缀文字
    suffixLabel: {
        type: String,
        default: ''
    },

    fontSize: {
        type: Number,
        default: 30
    },
    //tmicon-search
    search: {
        type: String,
        default: ''
    },
    //搜索
    searchLabel: {
        type: String,
        default: ''
    },
    showClear: {
        type: Boolean,
        default: false
    },
    password: {
        type: Boolean,
        default: false
    },
    //是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: '请输入内容'
    },
    //错误时，提示的文本。
    errorLabel: {
        type: String,
        default: '请输入内容'
    },
    //对齐方式。
    //left,right,center
    align: {
        type: String,
        default: 'left'
    },
    modelValue: {
        type: [String, Number],
        default: ""
    },
    inputPadding: {
        type: Array as PropType<Array<number>>,
        default: () => [24, 0]
    },
    //是否显示字符统计。
    showCharNumber: {
        type: Boolean,
        default: false
    },
    maxlength: {
        type: Number,
        default: -1
    },
    type: {
        type: String,
        default: 'text'
    },
    cursorSpacing: {
        type: Number,
        default: 24
    },
    confirmType: {
        type: String,
        default: 'done'
    },
    confirmHold: {
        type: Boolean,
        default: false
    },
    autoBlur: {
        type: Boolean,
        default: true
    },
    holdKeyboard: {
        type: Boolean,
        default: false
    },
    adjustPosition: {
        type: Boolean,
        default: true
    },


})

let parentFormItem = proxy.$parent
while (parentFormItem) {
    if (parentFormItem?.tmFormComnameFormItem == 'tmFormComnameFormItem' || !parentFormItem) {
        break;
    } else {
        parentFormItem = parentFormItem?.$parent ?? undefined

    }
}

const isAndroid = ref(false)
isAndroid.value = uni.getSystemInfoSync().platform == 'android' ? true : false;
const _height = computed(() => props.height)
const _inputPadding = computed(() => {
    if (props.search !== '' || props.searchLabel !== '') {
        return [4, 0]
    }
    return props.inputPadding;
})
const propsDetail = computed(() => {
    return {
        prefix: props.prefix,
        prefixLabel: props.prefixLabel,
        fontSize: props.fontSize,
        fontSize_px: uni.upx2px(props.fontSize),
        suffix: props.suffix,
        suffixLabel: props.suffixLabel,
        fontColor: props.fontColor,
        search: props.search,
        searchLabel: props.searchLabel,
        showClear: props.showClear,
        password: props.password,
        disabled: props.disabled,
        placeholder: props.placeholder,
        showCharNumber: props.showCharNumber,
        maxlength: props.maxlength,
        cursorSpacing: props.cursorSpacing,
        confirmType: props.confirmType,
        confirmHold: props.confirmHold,
        autoBlur: props.autoBlur,
        holdKeyboard: props.holdKeyboard,
        adjustPosition: props.adjustPosition,
        type: props.type,
    }
})
// 设置响应式全局组件库配置表。
const tmcfg = computed(() => store.tmStore);
//自定义样式：
const customCSSStyle = computed(() => computedStyle(props));
//自定类
const customClass = computed(() => computedClass(props));
//是否暗黑模式。
const isDark = computed(() => computedDark(props, tmcfg.value));
//当前是否显示检验错误状态？
const _requiredError = ref(false)
//是否聚焦中。
const _foucsActive = ref(false)
const _color = computed(() => {
    let color = props.color;
    if (_foucsActive.value) color = props.focusColor;
    if (_requiredError.value) color = 'red';
    return color;
})
//计算主题
const tmcomputed = computed(() => {
    const _props =
        { ...props, color: _color.value }
    return computedTheme(_props, isDark.value)
});

//显示密码和关闭密码。
const showPasswordText = ref(propsDetail.value.password)
const showPasswordIcon = computed(() => props.password)
const _errorLabel = ref(props.errorLabel)
const _value = ref(props.modelValue)
const _valueLenChar = computed(() => {
    //在ios上字符的长度不能采用str.length来计算。因为一个中文=2。一个英文=1；
    let str = String(_value.value).split("")
    return str.length;
})
watch(() => props.modelValue, () => _value.value = props.modelValue)
//--------------form表单专用------------------
const rulesObj = inject("tmFormItemRules", computed<rulesItem>(() => {
    return {
        message: props?.errorLabel ?? "请填写必要的内容",
        required: false,
        validator: false
    }
}))

//-------------- end ------------------

function searchClick() {
    emits("search", _value.value)
}
function clearBtn() {
    _value.value = "";
    emits("update:modelValue", "")
    emits("clear")
}
function changeSeePassword() {
    showPasswordText.value = !showPasswordText.value;
}
function focus() {
    _foucsActive.value = true;
    emits("focus")
}
function blur() {
    _foucsActive.value = false;
    pushFormItem();
    emits("blur")
}
function confirm() {

    emits("confirm", _value.value)
}
function inputHandler(e) {

    _value.value = e.detail.value;
    emits("input", e.detail.value)
    emits("update:modelValue", e.detail.value)
    return e.detail.value;
}

//设置当前状态。
//type:1,错误，2正常状态，3，正确。
function setStatus(type: number, message: string) {

}
//--------------以下是专门为form表单专用------------------
const tmFormFun = inject("tmFormFun", computed(() => ""))
async function pushFormItem(isCheckVail = true) {
    if (parentFormItem) {
        let isRe = false;
        if (isCheckVail && rulesObj.value?.required === true) {

            if (typeof rulesObj.value.validator == 'function') {
                isRe = await !rulesObj.value.validator(_value.value)
            } else if (typeof rulesObj.value.validator == 'boolean') {
                isRe = rulesObj.value.validator;
            }
            if (typeof rulesObj.value.validator !== 'function') {
                isRe = String(_value.value).length == 0
            }
            _requiredError.value = isRe;
        }
        _errorLabel.value = String(rulesObj.value.message);
        parentFormItem.pushCom({
            value: _value.value,
            isRequiredError: isRe,//true,错误，false正常 检验状态
            componentsName: 'tm-input',//表单组件类型。
            message: rulesObj.value.message,//检验信息提示语。
        })
    }
}
watch(tmFormFun, () => {
    if (tmFormFun.value == 'validate') {
        pushFormItem();
    }
    if (tmFormFun.value == 'reset') {
        _value.value = "";
        _requiredError.value = false;
        emits("update:modelValue", _value.value)
        pushFormItem(false);
    }
    if (tmFormFun.value == 'clearValidate') {
        _requiredError.value = false;
        pushFormItem(false);
    }
})
pushFormItem(false)
//-------------- end ------------------
</script>

<style scoped>
</style>>
