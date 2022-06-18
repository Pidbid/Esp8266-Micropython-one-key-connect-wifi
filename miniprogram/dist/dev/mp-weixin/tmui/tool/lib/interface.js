"use strict";
var cssDirection = /* @__PURE__ */ ((cssDirection2) => {
  cssDirection2["left"] = "left";
  cssDirection2["right"] = "right";
  cssDirection2["bottom"] = "bottom";
  cssDirection2["top"] = "top";
  cssDirection2["leftright"] = "x";
  cssDirection2["topbottom"] = "y";
  cssDirection2["topleft"] = "top-left";
  cssDirection2["topright"] = "top-right";
  cssDirection2["bottomleft"] = "bottom-left";
  cssDirection2["bottomright"] = "bottom-right";
  cssDirection2["all"] = "all";
  return cssDirection2;
})(cssDirection || {});
var linearDirection = /* @__PURE__ */ ((linearDirection2) => {
  linearDirection2["left"] = "to left";
  linearDirection2["right"] = "to right";
  linearDirection2["top"] = "to top";
  linearDirection2["bottom"] = "to bottom";
  linearDirection2["none"] = "";
  return linearDirection2;
})(linearDirection || {});
var linearDeep = /* @__PURE__ */ ((linearDeep2) => {
  linearDeep2["light"] = "light";
  linearDeep2["dark"] = "dark";
  linearDeep2["accent"] = "accent";
  return linearDeep2;
})(linearDeep || {});
var borderStyle = /* @__PURE__ */ ((borderStyle2) => {
  borderStyle2["solid"] = "solid";
  borderStyle2["dashed"] = "dashed";
  borderStyle2["dotted"] = "dotted";
  return borderStyle2;
})(borderStyle || {});
exports.borderStyle = borderStyle;
exports.cssDirection = cssDirection;
exports.linearDeep = linearDeep;
exports.linearDirection = linearDirection;
