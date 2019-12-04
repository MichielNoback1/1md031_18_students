"use strict";
var socket = io();

var vm = new Vue({
  el: '#myID',
  data: {
    burgers : [ { name: "The Onion Burger", kCal: "900", gluten: true, lactos: true, picture: "img/onion.jpg"},
    { name: "The Chicken Burger", kCal: "600", gluten: true, lactos: true, picture: "img/chicken.jpg"},
    { name: "The Halloumi Burger", kCal: "750", gluten: false, lactos: true, picture: "img/halloumi.jpg"}],
    myOrder: [],
    manyBurgers: [],
    orders: {},
    details: {},
    gender: "",
  },

  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },

  methods: {
      markDone: function() {
          var name = document.getElementById("fullname").value;
          var email = document.getElementById("email").value;
          //var street = document.getElementById("street").value;
          //var house = document.getElementById("house").value;
          var payment = document.getElementById("payment").value;
          var gender = document.getElementById("gender").value;
          this.myOrder.push({burger: this.manyBurgers, name: name, email: email, payment: payment, gender: this.gender})
          console.log(vm.myOrder);
        },

    getNext: function () {
          var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
    return Math.max(last, next);
          }, 0);
    return lastOrder + 1;
        },

    addOrder: function (event) {
          socket.emit("addOrder", { orderId: this.name,
                                    details: this.details,
                                    orderItems: vm.manyBurgers,
                                    personalInformation: vm.myOrder
                                  });
        },

      displayOrder: function() {
        var offset = {x: event.currentTarget.getBoundingClientRect().left,
                      y: event.currentTarget.getBoundingClientRect().top};
        this.details ={ x: event.clientX - 10 - offset.x,
                                 y: event.clientY - 10 - offset.y };
      }
    }
})
