"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _index = _interopRequireDefault(require("../models/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require('dotenv').config();
var _ = require('lodash');
var MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
var getTopDoctorHome = function getTopDoctorHome(limitInput) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var allDoctor;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].user.findAll({
              where: {
                roleid: "R2"
              },
              limit: parseInt(limitInput),
              order: [['createdAt', 'DESC']],
              attributes: {
                exclude: ['password']
              },
              include: [{
                model: _index["default"].allcodes,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].allcodes,
                as: 'genderData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].doctorinfor,
                attributes: ['note']
              }],
              raw: true,
              nest: true
            });
          case 3:
            allDoctor = _context.sent;
            // if (allDoctor && allDoctor.length > 0) {
            //     allDoctor.map(item => {
            //         item.image = Buffer.from(item.image, 'base64').toString('binary');
            //         return item;
            //     })
            // }
            resolve({
              errCode: 0,
              message: "Ok",
              data: allDoctor
            });
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getAllDoctors = function getAllDoctors() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var doctorAll;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _index["default"].user.findAll({
              where: {
                roleid: "R2"
              },
              attributes: {
                exclude: ['password', 'image']
              }
            });
          case 3:
            doctorAll = _context2.sent;
            resolve({
              errCode: 0,
              message: "Ok",
              data: doctorAll
            });
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var checkReuireFiels = function checkReuireFiels(data) {
  var arr = ['doctorid', 'contentHTML', 'contentMarkdown', 'action', 'selectPrice', 'selectPayment', 'selectProvice', 'nameClinic', 'nameAddress', 'note', 'selectSpecialtyId'];
  var isCheck = true;
  var element = '';
  for (var i = 0; i < arr.length; i++) {
    if (!data[arr[i]]) {
      isCheck = false;
      element = arr[i];
      break;
    }
  }
  return {
    isCheck: isCheck,
    element: element
  };
};
var saveInforDoctor = function saveInforDoctor(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var check, doctorInfor, dataDoctorinfor;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            check = checkReuireFiels(data);
            if (!(check.isCheck === false)) {
              _context3.next = 6;
              break;
            }
            resolve({
              errCode: 1,
              message: "Missing parameter: ".concat(check.element)
            });
            _context3.next = 29;
            break;
          case 6:
            if (!(data.action === 'CREATE')) {
              _context3.next = 11;
              break;
            }
            _context3.next = 9;
            return _index["default"].markdowns.create({
              contentHTML: data.contentHTML,
              contentMarkdown: data.contentMarkdown,
              descriptions: data.descriptions,
              doctorid: data.doctorid
            });
          case 9:
            _context3.next = 18;
            break;
          case 11:
            if (!(data.action === 'EDIT')) {
              _context3.next = 18;
              break;
            }
            _context3.next = 14;
            return _index["default"].markdowns.findOne({
              where: {
                doctorid: data.doctorid
              },
              raw: true
            });
          case 14:
            doctorInfor = _context3.sent;
            if (!doctorInfor) {
              _context3.next = 18;
              break;
            }
            _context3.next = 18;
            return _index["default"].markdowns.update({
              contentHTML: data.contentHTML,
              contentMarkdown: data.contentMarkdown,
              descriptions: data.descriptions,
              doctorid: data.doctorid
            }, {
              where: {
                doctorid: data.doctorid
              }
            });
          case 18:
            _context3.next = 20;
            return _index["default"].doctorinfor.findOne({
              where: {
                doctorid: data.doctorid
              },
              raw: true
            });
          case 20:
            dataDoctorinfor = _context3.sent;
            if (!dataDoctorinfor) {
              _context3.next = 26;
              break;
            }
            _context3.next = 24;
            return _index["default"].doctorinfor.update({
              specialtyid: data.selectSpecialtyId,
              clinicid: data.selectClinicId,
              priceid: data.selectPrice,
              proviceid: data.selectProvice,
              paymentid: data.selectPayment,
              addressclinic: data.nameAddress,
              nameclinic: data.nameClinic,
              note: data.note
            }, {
              where: {
                doctorid: data.doctorid
              }
            });
          case 24:
            _context3.next = 28;
            break;
          case 26:
            _context3.next = 28;
            return _index["default"].doctorinfor.create({
              specialtyid: data.selectSpecialtyId,
              clinicid: data.selectClinicId,
              doctorid: data.doctorid,
              priceid: data.selectPrice,
              proviceid: data.selectProvice,
              paymentid: data.selectPayment,
              addressclinic: data.nameAddress,
              nameclinic: data.nameClinic,
              note: data.note
            });
          case 28:
            resolve({
              errCode: 0,
              message: 'Created infor doctor'
            });
          case 29:
            _context3.next = 35;
            break;
          case 31:
            _context3.prev = 31;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0, "loi gi o day");
            reject(_context3.t0);
          case 35:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 31]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getDetailInforDoctor = function getDetailInforDoctor(idDoctor) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var inforDoctor;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            if (idDoctor) {
              _context4.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Missing required parameter!"
            });
            _context4.next = 10;
            break;
          case 5:
            _context4.next = 7;
            return _index["default"].user.findOne({
              where: {
                id: idDoctor
              },
              attributes: {
                exclude: ['password']
              },
              include: [{
                model: _index["default"].markdowns,
                attributes: ['id', 'contentHTML', 'contentMarkdown', 'descriptions', 'doctorid']
              }, {
                model: _index["default"].doctorinfor,
                attributes: {
                  exclude: ['id', 'doctorid', 'createdAt', 'updatedAt']
                },
                include: [{
                  model: _index["default"].allcodes,
                  as: 'priceType',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: _index["default"].allcodes,
                  as: 'provice',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: _index["default"].allcodes,
                  as: 'payment',
                  attributes: ['valueEn', 'valueVi']
                }]
              }, {
                model: _index["default"].allcodes,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: true,
              nest: true
            });
          case 7:
            inforDoctor = _context4.sent;
            // if (inforDoctor && inforDoctor.image) {
            //     inforDoctor.image = Buffer.from(inforDoctor.image, 'base64').toString('binary');
            // }
            if (!inforDoctor) inforDoctor = {};
            resolve({
              errCode: 0,
              message: "OK",
              data: inforDoctor
            });
          case 10:
            _context4.next = 15;
            break;
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 15:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 12]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var bulkCreateScheduleDoctor = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(data) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
              var schedule, exiting, toCreate;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    if (data.arrSchedule) {
                      _context5.next = 5;
                      break;
                    }
                    resolve({
                      errCode: 1,
                      message: "Missing required param !"
                    });
                    _context5.next = 16;
                    break;
                  case 5:
                    // MAX_NUMBER_SCHEDULE dung để giới hạng số lượng người khám bệnh, ko cho số lượng lớn hơn 10(với 10 là biến hardcode trong file env)
                    schedule = data.arrSchedule;
                    if (schedule && schedule.length > 0) {
                      schedule = schedule.map(function (item, index) {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                      });
                    }
                    //check data exist
                    _context5.next = 9;
                    return _index["default"].schedules.findAll({
                      where: {
                        doctorid: data.doctorid,
                        date: data.date
                      },
                      // where: { doctorid: doctorIdBigInt, date: { [Op.eq]: new Date(data.date) } },
                      // where: { doctorid: data.doctorid, date: { [Op.eq]: new Date(data.date) } },
                      attributes: ['maxNumber', 'date', 'timeType', 'doctorid']
                    });
                  case 9:
                    exiting = _context5.sent;
                    //check xem du lieu co bi trung ko
                    // dau + de chuyen doi tu string sang number
                    toCreate = _.differenceWith(schedule, exiting, function (a, b) {
                      return a.timeType === b.timeType && +a.date.toString() === +b.date.toString();
                    });
                    console.log(exiting, 'ma');
                    // return;
                    if (!(toCreate && toCreate.length > 0)) {
                      _context5.next = 15;
                      break;
                    }
                    _context5.next = 15;
                    return _index["default"].schedules.bulkCreate(toCreate);
                  case 15:
                    resolve({
                      errCode: 0,
                      message: "ok"
                    });
                  case 16:
                    _context5.next = 21;
                    break;
                  case 18:
                    _context5.prev = 18;
                    _context5.t0 = _context5["catch"](0);
                    reject(_context5.t0);
                  case 21:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[0, 18]]);
            }));
            return function (_x10, _x11) {
              return _ref6.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function bulkCreateScheduleDoctor(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
var getScheduleDoctorByDate = function getScheduleDoctorByDate(doctorId, date) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var dataSchedule;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (!(!doctorId || !date)) {
              _context7.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: 'Missing required parameters'
            });
            _context7.next = 10;
            break;
          case 5:
            _context7.next = 7;
            return _index["default"].schedules.findAll({
              where: {
                doctorid: doctorId,
                date: date
              },
              include: [{
                model: _index["default"].allcodes,
                as: 'timeData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].user,
                as: 'doctorData',
                attributes: ['firstName', 'lastName']
              }],
              raw: true,
              nest: true
            });
          case 7:
            dataSchedule = _context7.sent;
            if (!dataSchedule) dataSchedule = [];
            if (dataSchedule) {
              resolve({
                errCode: 0,
                message: 'OK',
                data: dataSchedule
              });
            }
          case 10:
            _context7.next = 15;
            break;
          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 15:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 12]]);
    }));
    return function (_x12, _x13) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var getDoctorExtraInforById = function getDoctorExtraInforById(idDoctor) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var dataExtra;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            if (idDoctor) {
              _context8.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: 'Missing required parameters'
            });
            _context8.next = 10;
            break;
          case 5:
            _context8.next = 7;
            return _index["default"].doctorinfor.findOne({
              where: {
                doctorid: idDoctor
              },
              attributes: {
                exclude: ['id', 'doctorid', 'createdAt', 'updatedAt']
              },
              include: [{
                model: _index["default"].allcodes,
                as: 'priceType',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].allcodes,
                as: 'provice',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: _index["default"].allcodes,
                as: 'payment',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: true,
              nest: true
            });
          case 7:
            dataExtra = _context8.sent;
            if (!dataExtra) dataExtra = {};
            resolve({
              errCode: 0,
              message: 'OK',
              data: dataExtra
            });
          case 10:
            _context8.next = 15;
            break;
          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 15:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 12]]);
    }));
    return function (_x14, _x15) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getProfileDoctorById = function getProfileDoctorById(idDoctor) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var profileDoctor;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            if (idDoctor) {
              _context9.next = 5;
              break;
            }
            resolve({
              errCode: 1,
              message: "Missing required parameters"
            });
            _context9.next = 10;
            break;
          case 5:
            _context9.next = 7;
            return _index["default"].user.findOne({
              where: {
                id: idDoctor
              },
              attributes: {
                exclude: ['password']
              },
              include: [{
                model: _index["default"].markdowns,
                attributes: ['id', 'contentHTML', 'contentMarkdown', 'descriptions', 'doctorid']
              }, {
                model: _index["default"].doctorinfor,
                attributes: {
                  exclude: ['id', 'doctorid', 'createdAt', 'updatedAt']
                },
                include: [{
                  model: _index["default"].allcodes,
                  as: 'priceType',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: _index["default"].allcodes,
                  as: 'provice',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: _index["default"].allcodes,
                  as: 'payment',
                  attributes: ['valueEn', 'valueVi']
                }]
              }, {
                model: _index["default"].allcodes,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: true,
              nest: true
            });
          case 7:
            profileDoctor = _context9.sent;
            // if (profileDoctor && profileDoctor.image) {
            //     profileDoctor.image = Buffer.from(profileDoctor.image, 'base64').toString('binary');
            // }
            if (!profileDoctor) profileDoctor = {};
            resolve({
              errCode: 0,
              message: "OK",
              data: profileDoctor
            });
          case 10:
            _context9.next = 15;
            break;
          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 15:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 12]]);
    }));
    return function (_x16, _x17) {
      return _ref9.apply(this, arguments);
    };
  }());
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveInforDoctor: saveInforDoctor,
  getDetailInforDoctor: getDetailInforDoctor,
  bulkCreateScheduleDoctor: bulkCreateScheduleDoctor,
  getScheduleDoctorByDate: getScheduleDoctorByDate,
  getDoctorExtraInforById: getDoctorExtraInforById,
  getProfileDoctorById: getProfileDoctorById
};