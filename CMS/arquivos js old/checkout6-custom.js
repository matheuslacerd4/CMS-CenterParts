function paymentUpdateCode(orderForm) {
  if (!orderForm.paymentData.payments.length) {
    return;
  }

  const orderFormId = orderForm.orderFormId;
  const paymentSystem = orderForm.paymentData.payments[0].paymentSystem;
  const paymentSystems = orderForm.paymentData.paymentSystems;

  const paymentSelected = paymentSystems.find((payment) => {
    return payment.id == paymentSystem;
  });

  // const cards = ['Visa', 'Mastercard', 'Diners', 'American Express', 'Hipercard', 'Aura', 'Elo', 'JCB', 'Visa Electron', 'Maestro'];

  // if (cards.includes(paymentSelected.name)) {
  // 	$('.--text-value-not-reached').remove();
  // 	$('.cart-fixed').removeClass('--value-not-reached');

  // 	return;
  // }

  var paymentCode = $(".steps-view .payment-method")
    .eq($(".payment-group-item.active").index())
    .find("div > select")
    .val();

  switch (paymentSystem) {
    case "125":
      paymentCode = `V01`;
      break;
    case "2":
      paymentCode = `VCD`;
      break;
    case "10":
      paymentCode = `VCC`;
      break;
  }

  if (!paymentCode) {
    if (!$("p.--text-value-not-reached").length) {
      $(".cart-fixed").append(
        '<p class="--text-value-not-reached">  O valor mínimo para compra no boleto não foi atingido </p>'
      );
    }

    $(".cart-fixed").addClass("--value-not-reached");

    return;
  }

  $(".cart-fixed").removeClass("--value-not-reached");
  $(".--text-value-not-reached").remove();

  try {
    fetch(
      `/api/checkout/pub/orderForm/${orderFormId}/customData/custom-payment/customPaymentId`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expectedOrderFormSections: [
            "items",
            "gifts",
            "totalizers",
            "clientProfileData",
            "shippingData",
            "paymentData",
            "sellers",
            "messages",
            "marketingData",
            "clientPreferencesData",
            "storePreferencesData",
            "customData",
          ],
          value: paymentCode,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((orderForm) => {
        console.log("success", orderForm.customData.customApps[0]);
      });
  } catch (error) {
    console.log("error", error);
    $("#payment-data-submit").remove();
  }
}

$(document).ready(function () {
  $(window).on("orderFormUpdated.vtex", (evt, orderForm) => {
    paymentUpdateCode(orderForm);

    let boletoInstallmentsElement = $("select[class*=qd-boleto-installments]");

    boletoInstallmentsElement.off();
    boletoInstallmentsElement.on("change", () => {
      paymentUpdateCode(orderForm);
    });
  });
});

$(window).on("hashchange", function () {
  if (window.location.hash == "#/cart") {
    clearCartUser();
    return;
  }

  $(".clear-cart").remove();
});

$(window).on("orderFormUpdated.vtex", (evt, orderForm) => {
  clearCartUser();
});

function clearCartUser() {
  if (!$(".clear-cart").length) {
    //$('#cart-title').append('<button class="clear-cart"> Limpar carrinho </button>');
  }

  $(".clear-cart").on("click", function (event) {
    vtexjs.checkout.removeAllItems().done((orderForm) => {
      console.log(orderForm);
    });
  });
}

/************** SWEETFILE MIN **************/

!(function (t) {
  var e = {};

  function r(n) {
    if (e[n]) return e[n].exports;
    var o = (e[n] = {
      i: n,
      l: !1,
      exports: {},
    });
    return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = t),
    (r.c = e),
    (r.d = function (t, e, n) {
      r.o(t, e) ||
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: n,
        });
    }),
    (r.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(t, "__esModule", {
          value: !0,
        });
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", {
          enumerable: !0,
          value: t,
        }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          r.d(
            n,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return r.d(e, "a", e), e;
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = "arquivos"),
    r((r.s = 79));
})({
  79: function (t, e, r) {
    r(80), (t.exports = r(81));
  },
  80: function (t, e) {
    function r(t) {
      return (r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }

    function n() {
      "use strict";
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
      n = function () {
        return t;
      };
      var t = {},
        e = Object.prototype,
        o = e.hasOwnProperty,
        i =
          Object.defineProperty ||
          function (t, e, r) {
            t[e] = r.value;
          },
        a = "function" == typeof Symbol ? Symbol : {},
        c = a.iterator || "@@iterator",
        u = a.asyncIterator || "@@asyncIterator",
        s = a.toStringTag || "@@toStringTag";

      function l(t, e, r) {
        return (
          Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        l({}, "");
      } catch (t) {
        l = function (t, e, r) {
          return (t[e] = r);
        };
      }

      function f(t, e, r, n) {
        var o = e && e.prototype instanceof p ? e : p,
          a = Object.create(o.prototype),
          c = new O(n || []);
        return (
          i(a, "_invoke", {
            value: _(t, r, c),
          }),
          a
        );
      }

      function d(t, e, r) {
        try {
          return {
            type: "normal",
            arg: t.call(e, r),
          };
        } catch (t) {
          return {
            type: "throw",
            arg: t,
          };
        }
      }
      t.wrap = f;
      var h = {};

      function p() {}

      function v() {}

      function y() {}
      var m = {};
      l(m, c, function () {
        return this;
      });
      var g = Object.getPrototypeOf,
        b = g && g(g(E([])));
      b && b !== e && o.call(b, c) && (m = b);
      var w = (y.prototype = p.prototype = Object.create(m));

      function x(t) {
        ["next", "throw", "return"].forEach(function (e) {
          l(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }

      function P(t, e) {
        var n;
        i(this, "_invoke", {
          value: function (i, a) {
            function c() {
              return new e(function (n, c) {
                !(function n(i, a, c, u) {
                  var s = d(t[i], t, a);
                  if ("throw" !== s.type) {
                    var l = s.arg,
                      f = l.value;
                    return f && "object" == r(f) && o.call(f, "__await")
                      ? e.resolve(f.__await).then(
                          function (t) {
                            n("next", t, c, u);
                          },
                          function (t) {
                            n("throw", t, c, u);
                          }
                        )
                      : e.resolve(f).then(
                          function (t) {
                            (l.value = t), c(l);
                          },
                          function (t) {
                            return n("throw", t, c, u);
                          }
                        );
                  }
                  u(s.arg);
                })(i, a, n, c);
              });
            }
            return (n = n ? n.then(c, c) : c());
          },
        });
      }

      function _(t, e, r) {
        var n = "suspendedStart";
        return function (o, i) {
          if ("executing" === n)
            throw new Error("Generator is already running");
          if ("completed" === n) {
            if ("throw" === o) throw i;
            return S();
          }
          for (r.method = o, r.arg = i; ; ) {
            var a = r.delegate;
            if (a) {
              var c = L(a, r);
              if (c) {
                if (c === h) continue;
                return c;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;
            else if ("throw" === r.method) {
              if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            n = "executing";
            var u = d(t, e, r);
            if ("normal" === u.type) {
              if (((n = r.done ? "completed" : "suspendedYield"), u.arg === h))
                continue;
              return {
                value: u.arg,
                done: r.done,
              };
            }
            "throw" === u.type &&
              ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
          }
        };
      }

      function L(t, e) {
        var r = e.method,
          n = t.iterator[r];
        if (void 0 === n)
          return (
            (e.delegate = null),
            ("throw" === r &&
              t.iterator.return &&
              ((e.method = "return"),
              (e.arg = void 0),
              L(t, e),
              "throw" === e.method)) ||
              ("return" !== r &&
                ((e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method"
                )))),
            h
          );
        var o = d(n, t.iterator, e.arg);
        if ("throw" === o.type)
          return (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), h;
        var i = o.arg;
        return i
          ? i.done
            ? ((e[t.resultName] = i.value),
              (e.next = t.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
              (e.delegate = null),
              h)
            : i
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            h);
      }

      function $(t) {
        var e = {
          tryLoc: t[0],
        };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }

      function j(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }

      function O(t) {
        (this.tryEntries = [
          {
            tryLoc: "root",
          },
        ]),
          t.forEach($, this),
          this.reset(!0);
      }

      function E(t) {
        if (t) {
          var e = t[c];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var r = -1,
              n = function e() {
                for (; ++r < t.length; )
                  if (o.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
                return (e.value = void 0), (e.done = !0), e;
              };
            return (n.next = n);
          }
        }
        return {
          next: S,
        };
      }

      function S() {
        return {
          value: void 0,
          done: !0,
        };
      }
      return (
        (v.prototype = y),
        i(w, "constructor", {
          value: y,
          configurable: !0,
        }),
        i(y, "constructor", {
          value: v,
          configurable: !0,
        }),
        (v.displayName = l(y, s, "GeneratorFunction")),
        (t.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === v || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (t.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, y)
              : ((t.__proto__ = y), l(t, s, "GeneratorFunction")),
            (t.prototype = Object.create(w)),
            t
          );
        }),
        (t.awrap = function (t) {
          return {
            __await: t,
          };
        }),
        x(P.prototype),
        l(P.prototype, u, function () {
          return this;
        }),
        (t.AsyncIterator = P),
        (t.async = function (e, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new P(f(e, r, n, o), i);
          return t.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(w),
        l(w, s, "Generator"),
        l(w, c, function () {
          return this;
        }),
        l(w, "toString", function () {
          return "[object Generator]";
        }),
        (t.keys = function (t) {
          var e = Object(t),
            r = [];
          for (var n in e) r.push(n);
          return (
            r.reverse(),
            function t() {
              for (; r.length; ) {
                var n = r.pop();
                if (n in e) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (t.values = E),
        (O.prototype = {
          constructor: O,
          reset: function (t) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = void 0),
              this.tryEntries.forEach(j),
              !t)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  o.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = void 0);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (t) {
            if (this.done) throw t;
            var e = this;

            function r(r, n) {
              return (
                (a.type = "throw"),
                (a.arg = t),
                (e.next = r),
                n && ((e.method = "next"), (e.arg = void 0)),
                !!n
              );
            }
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var i = this.tryEntries[n],
                a = i.completion;
              if ("root" === i.tryLoc) return r("end");
              if (i.tryLoc <= this.prev) {
                var c = o.call(i, "catchLoc"),
                  u = o.call(i, "finallyLoc");
                if (c && u) {
                  if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                  if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                } else if (c) {
                  if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                } else {
                  if (!u)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var n = this.tryEntries[r];
              if (
                n.tryLoc <= this.prev &&
                o.call(n, "finallyLoc") &&
                this.prev < n.finallyLoc
              ) {
                var i = n;
                break;
              }
            }
            i &&
              ("break" === t || "continue" === t) &&
              i.tryLoc <= e &&
              e <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), h)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && e && (this.next = e),
              h
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t)
                return this.complete(r.completion, r.afterLoc), j(r), h;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  j(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (t, e, r) {
            return (
              (this.delegate = {
                iterator: E(t),
                resultName: e,
                nextLoc: r,
              }),
              "next" === this.method && (this.arg = void 0),
              h
            );
          },
        }),
        t
      );
    }

    function o(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }

    function i(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, i) {
          var a = t.apply(e, r);

          function c(t) {
            o(a, n, i, c, u, "next", t);
          }

          function u(t) {
            o(a, n, i, c, u, "throw", t);
          }
          c(void 0);
        });
      };
    }
    var a = {
        searchProductTaxes: function (t) {
          var e = this;
          return i(
            n().mark(function r() {
              var o, i, a, c, u;
              return n().wrap(function (r) {
                for (;;)
                  switch ((r.prev = r.next)) {
                    case 0:
                      (o = t.email),
                        (i = t.items),
                        (a = t.salesChannel),
                        (c = t.logisticsInfo),
                        (u = i.map(function (t, e) {
                          return {
                            id: t.id,
                            quantity: t.quantity,
                            seller: t.seller,
                            sellingPrice: t.sellingPrice,
                            listPrice: t.listPrice,
                            logistics: c[e].selectedSla,
                          };
                        })),
                        fetch("/api/io/_v/app/taxprovider/products", {
                          method: "POST",
                          body: JSON.stringify({
                            email: o,
                            salesChannel: a,
                            items: u,
                          }),
                        })
                          .then(function (t) {
                            return t.json();
                          })
                          .then(function (t) {
                            e.updatePriceTax(t, u);
                          });
                    case 3:
                    case "end":
                      return r.stop();
                  }
              }, r);
            })
          )();
        },
        updatePriceTax: function (t, e) {
          var r = this;
          $(".product-item").each(function (n) {
            var o = t.find(function (t) {
                return t.id === n;
              }),
              i = e[o.id],
              a = i.sellingPrice,
              c = i.listPrice,
              u = i.quantity,
              s = o.taxes[0].value / u;
            r.setPriceTaxProduct({
              productPrice: a,
              taxPrice: s,
              $this: $(this),
              $seletor: ".product-price .best-price .new-product-price",
            }),
              r.setPriceTaxProduct({
                productPrice: c,
                taxPrice: s,
                $this: $(this),
                $seletor: ".product-price .list-price .old-product-price",
              }),
              r.setPriceTaxProduct({
                productPrice: a * e[o.id].quantity,
                taxPrice: o.taxes[0].value,
                $this: $(this),
                $seletor: ".quantity-price .total-selling-price",
              });
          }),
            $(".list-price .old-product-price").addClass("--remove-load"),
            $(".best-price .new-product-price").addClass("--remove-load"),
            $(".quantity-price .total-selling-price").addClass("--remove-load");
        },
        setPriceTaxProduct: function (t) {
          var e = t.taxPrice,
            r = t.productPrice,
            n = t.$this,
            o = t.$seletor,
            i = r / 100 + e;
          n.find(o).text(this.formatMoney(i, ",", "."));
        },
        formatMoney: function (t, e, r) {
          if (!t || Number.isNaN(t) || !e || !r) return "";
          var n = Number.isFinite(+t) ? +t : 0,
            o = Number.isFinite(2) ? Math.abs(2) : 0,
            i = void 0 === r ? "," : r,
            a = void 0 === e ? "." : e;
          var c = (
            o
              ? (function (t, e) {
                  var r = Math.pow(10, e);
                  return "".concat(Math.round(t * r) / r);
                })(n, o)
              : "".concat(Math.round(n))
          ).split(".");
          return (
            c[0].length > 3 &&
              (c[0] = c[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, i)),
            (""[1] || "").length < o &&
              ((c[1] = c[1] || ""),
              (c[1] += new Array(o - c[1].length + 1).join("0"))),
            "R$ ".concat(c.join(a))
          );
        },
      },
      c = {
        start: function (t) {
          this.addHtmlFlag(), this.fetchCredit(t), this.creditMessagePayment();
        },
        addHtmlFlag: function () {
          var t =
            '<div class="custumer-credit">\n            <p class="credit__text">\n                Limite de crédito:\n\n                <strong class="credit__text-price">\n                    R$ 0,00\n                </strong>\n            </p>\n        </div>';
          $("h1#orderform-title").append(t),
            $("body.body-cart #cart-title").prepend(t),
            $(".orderform-template .mini-cart .custumer-credit").length ||
              $(".orderform-template .mini-cart").prepend(t);
        },
        fetchCredit: function (t) {
          var e = this;
          fetch("/api/io/_v/app/credit/accounts", {
            method: "POST",
            body: JSON.stringify({
              email: t,
            }),
          })
            .then(function (t) {
              return t.json();
            })
            .then(function (t) {
              var r = t.availableCredit;
              r &&
                ($(".custumer-credit .credit__text-price").text(
                  e.formatMoney(r, ",", ".")
                ),
                $(".custumer-credit").addClass("--show"));
            });
        },
        creditMessagePayment: function () {
          $(".custumer-credit-limit").length ||
            $(".custom202PaymentGroupPaymentGroup").append(
              '<div class="custumer-credit-limit">\n            <p class="custumer-credit-limit__text">\n                Caso você não tenha limite de crédito disponível ou seja insuficiente, seu pedido passará por análise e pode ser \n\n                <strong class="custumer-credit-limit__strong">\n                    aprovado ou recusado\n                </strong>\n            </p>\n        </div>'
            );
        },
        formatMoney: function (t, e, r) {
          if (!t || Number.isNaN(t) || !e || !r) return "";
          var n = Number.isFinite(+t) ? +t : 0,
            o = Number.isFinite(2) ? Math.abs(2) : 0,
            i = void 0 === r ? "," : r,
            a = void 0 === e ? "." : e;
          var c = (
            o
              ? (function (t, e) {
                  var r = Math.pow(10, e);
                  return "".concat(Math.round(t * r) / r);
                })(n, o)
              : "".concat(Math.round(n))
          ).split(".");
          return (
            c[0].length > 3 &&
              (c[0] = c[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, i)),
            (""[1] || "").length < o &&
              ((c[1] = c[1] || ""),
              (c[1] += new Array(o - c[1].length + 1).join("0"))),
            "R$ ".concat(c.join(a))
          );
        },
      };
    $(document).ready(function () {
      $(window).on("orderFormUpdated.vtex", function (t, e) {
        var r = e.orderFormId,
          n = e.items;
        if (e.clientProfileData) {
          var o = (function (t) {
              for (
                var e = "".concat(t, "="),
                  r = decodeURIComponent(document.cookie).split(";"),
                  n = 0;
                n < r.length;
                n++
              ) {
                for (var o = r[n]; " " === o.charAt(0); ) o = o.substring(1);
                if (0 === o.indexOf(e)) return o.substring(e.length, o.length);
              }
              return "";
            })("VTEXSC").split("=")[1],
            i = e.clientProfileData.email,
            u = e.shippingData.logisticsInfo;
          window.orderFormId = r;
          var s,
            l =
              "taxprovider/" ===
              ((s = "tax"), new URL(window.location.href).searchParams.get(s));
          console.log("##### orderFormUpdated #####", e),
            console.log("###### isLoadTaxProvider ######", l),
            l &&
              a.searchProductTaxes({
                email: i,
                items: n,
                salesChannel: o,
                logisticsInfo: u,
              }),
            c.start(i);
        }
      });
    });
  },
  81: function (t, e, r) {},
});

/************** SWEETFILE MIN **************/
