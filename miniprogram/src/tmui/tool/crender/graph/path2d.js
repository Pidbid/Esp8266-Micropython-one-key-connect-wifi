/**
 * svg路径绘制。
 * 作者：tmzdy
 * url:https://jx2d.cn
 */
function parsePathData(data) {
	if (!data) {
		return [];
	}
	var cs = data;
	var cc = [
		'm',
		'M',
		'l',
		'L',
		'v',
		'V',
		'h',
		'H',
		'z',
		'Z',
		'c',
		'C',
		'q',
		'Q',
		't',
		'T',
		's',
		'S',
		'a',
		'A',
	];
	cs = cs.replace(new RegExp(' ', 'g'), ',');
	for (var n = 0; n < cc.length; n++) {
		cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
	}
	var arr = cs.split('|');
	var ca = [];
	var coords = [];
	var cpx = 0;
	var cpy = 0;
	var re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
	var match;
	for (n = 1; n < arr.length; n++) {
		var str = arr[n];
		var c = str.charAt(0);
		str = str.slice(1);
		coords.length = 0;
		while ((match = re.exec(str))) {
			coords.push(match[0]);
		}
		var p = [];
		for (var j = 0, jlen = coords.length; j < jlen; j++) {
			if (coords[j] === '00') {
				p.push(0, 0);
				continue;
			}
			var parsed = parseFloat(coords[j]);
			if (!isNaN(parsed)) {
				p.push(parsed);
			} else {
				p.push(0);
			}
		}
		while (p.length > 0) {
			if (isNaN(p[0])) {
				break;
			}
			var cmd = null;
			var points = [];
			var startX = cpx,
				startY = cpy;
			var prevCmd, ctlPtx, ctlPty;
			var rx, ry, psi, fa, fs, x1, y1;
			switch (c) {
				case 'l':
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'L':
					cpx = p.shift();
					cpy = p.shift();
					points.push(cpx, cpy);
					break;
				case 'm':
					var dx = p.shift();
					var dy = p.shift();
					cpx += dx;
					cpy += dy;
					cmd = 'M';
					if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
						for (var idx = ca.length - 2; idx >= 0; idx--) {
							if (ca[idx].command === 'M') {
								cpx = ca[idx].points[0] + dx;
								cpy = ca[idx].points[1] + dy;
								break;
							}
						}
					}
					points.push(cpx, cpy);
					c = 'l';
					break;
				case 'M':
					cpx = p.shift();
					cpy = p.shift();
					cmd = 'M';
					points.push(cpx, cpy);
					c = 'L';
					break;
				case 'h':
					cpx += p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'H':
					cpx = p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'v':
					cpy += p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'V':
					cpy = p.shift();
					cmd = 'L';
					points.push(cpx, cpy);
					break;
				case 'C':
					points.push(p.shift(), p.shift(), p.shift(), p.shift());
					cpx = p.shift();
					cpy = p.shift();
					points.push(cpx, cpy);
					break;
				case 'c':
					points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'C';
					points.push(cpx, cpy);
					break;
				case 'S':
					ctlPtx = cpx;
					ctlPty = cpy;
					prevCmd = ca[ca.length - 1];
					if (prevCmd.command === 'C') {
						ctlPtx = cpx + (cpx - prevCmd.points[2]);
						ctlPty = cpy + (cpy - prevCmd.points[3]);
					}
					points.push(ctlPtx, ctlPty, p.shift(), p.shift());
					cpx = p.shift();
					cpy = p.shift();
					cmd = 'C';
					points.push(cpx, cpy);
					break;
				case 's':
					ctlPtx = cpx;
					ctlPty = cpy;
					prevCmd = ca[ca.length - 1];
					if (prevCmd.command === 'C') {
						ctlPtx = cpx + (cpx - prevCmd.points[2]);
						ctlPty = cpy + (cpy - prevCmd.points[3]);
					}
					points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'C';
					points.push(cpx, cpy);
					break;
				case 'Q':
					points.push(p.shift(), p.shift());
					cpx = p.shift();
					cpy = p.shift();
					points.push(cpx, cpy);
					break;
				case 'q':
					points.push(cpx + p.shift(), cpy + p.shift());
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'Q';
					points.push(cpx, cpy);
					break;
				case 'T':
					ctlPtx = cpx;
					ctlPty = cpy;
					prevCmd = ca[ca.length - 1];
					if (prevCmd.command === 'Q') {
						ctlPtx = cpx + (cpx - prevCmd.points[0]);
						ctlPty = cpy + (cpy - prevCmd.points[1]);
					}
					cpx = p.shift();
					cpy = p.shift();
					cmd = 'Q';
					points.push(ctlPtx, ctlPty, cpx, cpy);
					break;
				case 't':
					ctlPtx = cpx;
					ctlPty = cpy;
					prevCmd = ca[ca.length - 1];
					if (prevCmd.command === 'Q') {
						ctlPtx = cpx + (cpx - prevCmd.points[0]);
						ctlPty = cpy + (cpy - prevCmd.points[1]);
					}
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'Q';
					points.push(ctlPtx, ctlPty, cpx, cpy);
					break;
				case 'A':
					rx = p.shift();
					ry = p.shift();
					psi = p.shift();
					fa = p.shift();
					fs = p.shift();
					x1 = cpx;
					y1 = cpy;
					cpx = p.shift();
					cpy = p.shift();
					cmd = 'A';
					points = convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
					break;
				case 'a':
					rx = p.shift();
					ry = p.shift();
					psi = p.shift();
					fa = p.shift();
					fs = p.shift();
					x1 = cpx;
					y1 = cpy;
					cpx += p.shift();
					cpy += p.shift();
					cmd = 'A';
					points = convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
					break;
			}
			ca.push({
				command: cmd || c,
				points: points,
				start: {
					x: startX,
					y: startY,
				},
				pathLength: calcLength(startX, startY, cmd || c, points),
			});
		}
		if (c === 'z' || c === 'Z') {
			ca.push({
				command: 'z',
				points: [],
				start: undefined,
				pathLength: 0,
			});
		}
	}
	return ca;
}

function calcLength(x, y, cmd, points) {
	var len, p1, p2, t;
	
	switch (cmd) {
		case 'L':
			return getLineLength(x, y, points[0], points[1]);
		case 'C':
			len = 0.0;
			p1 = getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
			for (t = 0.01; t <= 1; t += 0.01) {
				p2 = getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[
					5]);
				len += getLineLength(p1.x, p1.y, p2.x, p2.y);
				p1 = p2;
			}
			return len;
		case 'Q':
			len = 0.0;
			p1 = getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
			for (t = 0.01; t <= 1; t += 0.01) {
				p2 = getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
				len += getLineLength(p1.x, p1.y, p2.x, p2.y);
				p1 = p2;
			}
			return len;
		case 'A':
			len = 0.0;
			var start = points[4];
			var dTheta = points[5];
			var end = points[4] + dTheta;
			var inc = Math.PI / 180.0;
			if (Math.abs(start - end) < inc) {
				inc = Math.abs(start - end);
			}
			p1 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
			if (dTheta < 0) {
				for (t = start - inc; t > end; t -= inc) {
					p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
					len += getLineLength(p1.x, p1.y, p2.x, p2.y);
					p1 = p2;
				}
			} else {
				for (t = start + inc; t < end; t += inc) {
					p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
					len += getLineLength(p1.x, p1.y, p2.x, p2.y);
					p1 = p2;
				}
			}
			p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
			len += getLineLength(p1.x, p1.y, p2.x, p2.y);
			return len;
	}
	return 0;
}

function convertEndpointToCenterParameterization(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
	var psi = psiDeg * (Math.PI / 180.0);
	var xp = (Math.cos(psi) * (x1 - x2)) / 2.0 + (Math.sin(psi) * (y1 - y2)) / 2.0;
	var yp = (-1 * Math.sin(psi) * (x1 - x2)) / 2.0 +
		(Math.cos(psi) * (y1 - y2)) / 2.0;
	var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
	if (lambda > 1) {
		rx *= Math.sqrt(lambda);
		ry *= Math.sqrt(lambda);
	}
	var f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) /
		(rx * rx * (yp * yp) + ry * ry * (xp * xp)));
	if (fa === fs) {
		f *= -1;
	}
	if (isNaN(f)) {
		f = 0;
	}
	var cxp = (f * rx * yp) / ry;
	var cyp = (f * -ry * xp) / rx;
	var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
	var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
	var vMag = function(v) {
		return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	};
	var vRatio = function(u, v) {
		return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
	};
	var vAngle = function(u, v) {
		return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
	};
	var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
	var u = [(xp - cxp) / rx, (yp - cyp) / ry];
	var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
	var dTheta = vAngle(u, v);
	if (vRatio(u, v) <= -1) {
		dTheta = Math.PI;
	}
	if (vRatio(u, v) >= 1) {
		dTheta = 0;
	}
	if (fs === 0 && dTheta > 0) {
		dTheta = dTheta - 2 * Math.PI;
	}
	if (fs === 1 && dTheta < 0) {
		dTheta = dTheta + 2 * Math.PI;
	}
	return [cx, cy, rx, ry, theta, dTheta, psi, fs];
}

function getSelfRect() {
	var points = [];
	this.dataArray.forEach(function(data) {
		if (data.command === 'A') {
			var start = data.points[4];
			var dTheta = data.points[5];
			var end = data.points[4] + dTheta;
			var inc = Math.PI / 180.0;
			if (Math.abs(start - end) < inc) {
				inc = Math.abs(start - end);
			}
			if (dTheta < 0) {
				for (let t = start - inc; t > end; t -= inc) {
					const point = Path.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2],
						data.points[3], t, 0);
					points.push(point.x, point.y);
				}
			} else {
				for (let t = start + inc; t < end; t += inc) {
					const point = Path.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2],
						data.points[3], t, 0);
					points.push(point.x, point.y);
				}
			}
		} else if (data.command === 'C') {
			for (let t = 0.0; t <= 1; t += 0.01) {
				const point = Path.getPointOnCubicBezier(t, data.start.x, data.start.y, data.points[0], data
					.points[1], data.points[2], data.points[3], data.points[4], data.points[5]);
				points.push(point.x, point.y);
			}
		} else {
			points = points.concat(data.points);
		}
	});
	var minX = points[0];
	var maxX = points[0];
	var minY = points[1];
	var maxY = points[1];
	var x, y;
	for (var i = 0; i < points.length / 2; i++) {
		x = points[i * 2];
		y = points[i * 2 + 1];
		if (!isNaN(x)) {
			minX = Math.min(minX, x);
			maxX = Math.max(maxX, x);
		}
		if (!isNaN(y)) {
			minY = Math.min(minY, y);
			maxY = Math.max(maxY, y);
		}
	}
	return {
		x: Math.round(minX),
		y: Math.round(minY),
		width: Math.round(maxX - minX),
		height: Math.round(maxY - minY),
	};
}



function getPointAtLength(length) {
	var point, i = 0,
		ii = this.dataArray.length;
	if (!ii) {
		return null;
	}
	while (i < ii && length > this.dataArray[i].pathLength) {
		length -= this.dataArray[i].pathLength;
		++i;
	}
	if (i === ii) {
		point = this.dataArray[i - 1].points.slice(-2);
		return {
			x: point[0],
			y: point[1],
		};
	}
	if (length < 0.01) {
		point = this.dataArray[i].points.slice(0, 2);
		return {
			x: point[0],
			y: point[1],
		};
	}
	var cp = this.dataArray[i];
	var p = cp.points;
	switch (cp.command) {
		case 'L':
			return Path.getPointOnLine(length, cp.start.x, cp.start.y, p[0], p[1]);
		case 'C':
			return Path.getPointOnCubicBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3], p[
				4], p[5]);
		case 'Q':
			return Path.getPointOnQuadraticBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[
				3]);
		case 'A':
			var cx = p[0],
				cy = p[1],
				rx = p[2],
				ry = p[3],
				theta = p[4],
				dTheta = p[5],
				psi = p[6];
			theta += (dTheta * length) / cp.pathLength;
			return Path.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
	}
	return null;
}

function getLineLength(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function getPointOnLine(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
	if (fromX === undefined) {
		fromX = P1x;
	}
	if (fromY === undefined) {
		fromY = P1y;
	}
	var m = (P2y - P1y) / (P2x - P1x + 0.00000001);
	var run = Math.sqrt((dist * dist) / (1 + m * m));
	if (P2x < P1x) {
		run *= -1;
	}
	var rise = m * run;
	var pt;
	if (P2x === P1x) {
		pt = {
			x: fromX,
			y: fromY + rise,
		};
	} else if ((fromY - P1y) / (fromX - P1x + 0.00000001) === m) {
		pt = {
			x: fromX + run,
			y: fromY + rise,
		};
	} else {
		var ix, iy;
		var len = this.getLineLength(P1x, P1y, P2x, P2y);
		var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
		u = u / (len * len);
		ix = P1x + u * (P2x - P1x);
		iy = P1y + u * (P2y - P1y);
		var pRise = this.getLineLength(fromX, fromY, ix, iy);
		var pRun = Math.sqrt(dist * dist - pRise * pRise);
		run = Math.sqrt((pRun * pRun) / (1 + m * m));
		if (P2x < P1x) {
			run *= -1;
		}
		rise = m * run;
		pt = {
			x: ix + run,
			y: iy + rise,
		};
	}
	return pt;
}
function getPointOnCubicBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
	function CB1(t) {
		return t * t * t;
	}

	function CB2(t) {
		return 3 * t * t * (1 - t);
	}

	function CB3(t) {
		return 3 * t * (1 - t) * (1 - t);
	}

	function CB4(t) {
		return (1 - t) * (1 - t) * (1 - t);
	}
	var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
	var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
	return {
		x: x,
		y: y,
	};
}
function getPointOnQuadraticBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y) {
	function QB1(t) {
		return t * t;
	}

	function QB2(t) {
		return 2 * t * (1 - t);
	}

	function QB3(t) {
		return (1 - t) * (1 - t);
	}
	var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
	var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
	return {
		x: x,
		y: y,
	};
}
function getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
	var cosPsi = Math.cos(psi),
		sinPsi = Math.sin(psi);
	var pt = {
		x: rx * Math.cos(theta),
		y: ry * Math.sin(theta),
	};
	return {
		x: cx + (pt.x * cosPsi - pt.y * sinPsi),
		y: cy + (pt.x * sinPsi + pt.y * cosPsi),
	};
}


let path2d = function(render, config = {}) {
	const [w, h] = render.area;
	
	let cfg = {
		name: 'path',
		animationCurve: 'easeOutBack',
		hover: true,
		drag: true,
		shape: {
			path: '',
			close:true,
			points:[]
		},
		style: {
			stroke: '#000',
			fill:'#000',
			lineWidth: 1,
			hoverCursor: 'pointer',
		},
		...config,
		draw({ ctx }, { shape, style: { lineWidth } }){
			let { points, close,x,y ,path} = shape
			
			
			
			var ca=[]
			if(this.shape['points'].length>0&&this.shape['points']){
				ca = this.shape['svg']
			}else{
				ca = parsePathData(path);
				// ca = ca.map(el=>{
				// 	if(el.points.length){
				// 		return {...el,points:[el.points[0]+x,el.points[1]+y]}
				// 	}
				// 	return el
				// })
				let ar = ca.map(el=> el.points)
				this.shape['points'] = ar.filter((el)=>el.length==2)
				this.shape['svg'] = ca;
			}
			const context=ctx
			context.beginPath();
			
			
			for (var n = 0; n < ca.length; n++) {
			    var c = ca[n].command;
			    var p = ca[n].points;
			    switch (c) {
			        case 'L':
			            context.lineTo(p[0], p[1]);
			            break;
			        case 'M':
			            context.moveTo(p[0], p[1]);
			            break;
			        case 'C':
			            context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
			            break;
			        case 'Q':
			            context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
			            break;
			        case 'A':
			            var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6], fs = p[7];
			            var r = rx > ry ? rx : ry;
			            var scaleX = rx > ry ? 1 : rx / ry;
			            var scaleY = rx > ry ? ry / rx : 1;
			            context.translate(cx, cy);
			            context.rotate(psi);
			            context.scale(scaleX, scaleY);
			            context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
			            context.scale(1 / scaleX, 1 / scaleY);
			            context.rotate(-psi);
			            context.translate(-cx, -cy);
			            break;
			        case 'z':
			            close = true;
			            context.closePath();
			            break;
			    }
			}
			
			
			
			if (close) {
			  ctx.closePath()
			
			  ctx.fill()
			  ctx.stroke()
			} else {
			  ctx.stroke()
			}
			
		},
		
	};

	return cfg;
}

export default path2d;
