export interface headresItem {
    title:string,//列表的标题。默认为：""
    key:string,//这个key需要和tabdata中的key相同，表示同一列。
    width:number,//列表宽，默认88
    align:string,//对齐方向，start左,center中,end右,默认center
    sort:boolean,//是否显示排序,默认false
    bgColor:string,//当前头的背景色。默认grey
    cellColor:string,//当前列的背景色。,如果为"",则使用行数据的背景，如果行背景也没有提供，使用white.
    light:boolean,//背景色是否是浅色
}

export interface cellItem {
    key:string,//这个key需要和headres中的key相同，表示同一列。
    color:string,//当前列的背景色。,如果为"",则使用行数据的背景，如果行背景也没有提供，使用white.
    light:boolean,//背景色是否是浅色
    align:string,//对齐方向，start左,center中,end右,默认center
    data:any,
    [propName: string]: any;

}