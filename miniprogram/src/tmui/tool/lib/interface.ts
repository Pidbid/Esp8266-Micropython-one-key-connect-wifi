/*
 * @Date: 2022-03-09 12:34:45
 * @LastEditors: tmzdy
 * @Author: tmzdy
 * @Description: 文件
 */

//颜色类型
export interface rgba {
    r: number,
    g: number,
    b: number,
    a: number
}
export interface hsva {
    h: number,
    s: number,
    v: number,
    a: number
}
export interface hsla {
    h: number,
    s: number,
    l: number,
    a: number
}

//生成主题的必要配置
export interface cssStyleConfig {
    colorname: string,//颜色名称
    borderWidth?: number,//边线宽度
    borderDirection?: cssDirection,//边线的方向
    linearDirection?: linearDirection,//渐变的方向.
    linearDeep?: linearDeep,//light,dark,亮系渐变和深色渐变。
    shadow?: number,//投影的大小，
    round?: number,//圆角大小
    opaticy?: number,//透明度
    dark: boolean,//暗黑
    outlined?: boolean,
    text?: boolean,
    borderStyle?:string,
	blur?:boolean
}

//输入主题的属性css样式表。
export interface cssstyle {
    colorname?: string,//颜色名称
    border?: string,//边线颜色
    borderCss?: any,
    backgroundColor?: string,//背景颜色
    backgroundColorCss?: object,
    textColor?: string,//文字颜色
    textColorCss?: object,
    elevation?: number,//安卓端的投影。
    shadowColor?: object,
    config?:cssStyleConfig
    gradientColor?:Array<string>,
    cardcolor?: string,//项目暗黑下的背景色
    inputcolor?: string,//输入框，表单等暗黑下的背景色
    bodycolor?: string,//暗黑下的背景色
    disablecolor?: string,//禁用的项目或者表单暗黑下
    textDisableColor?: string,//文本禁用色.暗黑下
    isBlackAndWhite?:boolean,//该主题是否是黑白色系。
}

//颜色主题对象。
export interface colorThemeType {
    name: string,
    value: string,
    hsva: hsva,
    rgba: rgba,
    hsla: hsla,
    csscolor?: string
}
//主题方向
export enum cssDirection {
    left = "left",
    right = "right",
    bottom = "bottom",
    top = "top",
    leftright = "x",
    topbottom = "y",
    topleft = "top-left",
    topright = "top-right",
    bottomleft = "bottom-left",
    bottomright = "bottom-right",
    all = "all"
}
//渐变方向
export enum linearDirection {
    left = "to left",
    right = "to right",
    top = "to top",
    bottom = "to bottom",
    none = ""
}
//渐变的颜色类型
export enum linearDeep {
    /**
     * 亮色
     */
    light = "light",
    /**
     * 暗黑，偏暗
     */
    dark = "dark",
    /**
     * 强调色
     */
    accent = "accent",
}
// 边线样式
export enum borderStyle {
    solid = 'solid',
    dashed = 'dashed',
    dotted = 'dotted',
}
// 微信分享结构类型
export interface wxshareConfig {
    title?: string, // 分享标题
    desc?: string, // 描述
    imageUrl?: string, // 分享图片
    path?: string, // 分享路径
    copyLink?: string, // 复制链接
    query?: any, // 分享参数
}
//store下的tmcfg参数对象类型。
export interface tmVuetify {
    color: string,
    dark: boolean,
    tmVueTifly_pages: string,
    tmVueTifly_pagesIndex: string,
    //这里是微信小程序和微信H5的配置资料。
    wxshareConfig_miniMp:wxshareConfig ,
    //当前存储存的主题对象。
    colorList: Array<colorThemeType>,
    //当前的语言
    local:string
    os:string
}