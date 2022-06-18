"use strict";
var colortool = {
  rgbaToHsla(scolor) {
    let { r, g, b, a } = scolor;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var l = (min + max) / 2;
    var difference = max - min;
    var h = 0, s = 0;
    if (max == min) {
      h = 0;
      s = 0;
    } else {
      s = l > 0.5 ? difference / (2 - max - min) : difference / (max + min);
      switch (max) {
        case r:
          h = (g - b) / difference + (g < b ? 6 : 0);
          break;
        case g:
          h = 2 + (b - r) / difference;
          break;
        case b:
          h = 4 + (r - g) / difference;
          break;
      }
      h = Math.round(h * 60);
    }
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return { h, s, l, a };
  },
  hslaToRgba(scolor) {
    let { h, s, l, a } = scolor;
    h = h / 360;
    s = s / 100;
    l = l / 100;
    var rgb = [];
    if (s == 0) {
      rgb = [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255)];
    } else {
      var q = l >= 0.5 ? l + s - l * s : l * (1 + s);
      var p = 2 * l - q;
      rgb[0] = h + 1 / 3;
      rgb[1] = h;
      rgb[2] = h - 1 / 3;
      for (var i = 0; i < rgb.length; i++) {
        var tc = rgb[i];
        if (tc < 0) {
          tc = tc + 1;
        } else if (tc > 1) {
          tc = tc - 1;
        }
        switch (true) {
          case tc < 1 / 6:
            tc = p + (q - p) * 6 * tc;
            break;
          case (1 / 6 <= tc && tc < 0.5):
            tc = q;
            break;
          case (0.5 <= tc && tc < 2 / 3):
            tc = p + (q - p) * (4 - 6 * tc);
            break;
          default:
            tc = p;
            break;
        }
        rgb[i] = Math.round(tc * 255);
      }
    }
    return { r: rgb[0], g: rgb[1], b: rgb[2], a };
  },
  cssToRgba: function(sColor) {
    if (!sColor) {
      return { r: 0, g: 0, b: 0, a: 0 };
    }
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return {
        r: sColorChange[0],
        g: sColorChange[1],
        b: sColorChange[2],
        a: 1
      };
    } else if (/^(rgb|RGB|rgba|RGBA)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB|RGBA|rgba)*/g, "").split(",");
      let p = arr.map((val) => Number(val));
      if (p.length < 3) {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        };
      }
      if (p.length == 3) {
        p.push(1);
      }
      return {
        r: p[0],
        g: p[1],
        b: p[2],
        a: p[3]
      };
    } else {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      };
    }
  },
  rgbaToHsva: function(rgba2) {
    if (!rgba2)
      return {
        h: 0,
        s: 1,
        v: 1,
        a: 1
      };
    const r = rgba2.r / 255;
    const g = rgba2.g / 255;
    const b = rgba2.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    if (max !== min) {
      if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
      } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
      } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
      }
    }
    if (h < 0)
      h = h + 360;
    const s = max === 0 ? 0 : (max - min) / max;
    const hsv = [h, s, max];
    return {
      h: hsv[0],
      s: hsv[1],
      v: hsv[2],
      a: rgba2.a
    };
  },
  hsvaToRgba: function(sColor) {
    var { h, s, v, a } = sColor;
    var r = 0;
    var g = 0;
    var b = 0;
    var i;
    var f;
    var p;
    var q;
    var t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    return { r, g, b, a };
  },
  rgbaToCss: function(sColor) {
    return `rgba(${sColor.r},${sColor.g},${sColor.b},${sColor.a})`;
  }
};
exports.colortool = colortool;
