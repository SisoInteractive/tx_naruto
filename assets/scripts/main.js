// Created by sam mok 2015(Siso brand interactive team).

"use strict";

var app = {
    create: function () {
        //  create slider
        var slidelen = $('.swiper-slide').length;

        app.mySwiper = new Swiper('.swiper-container', {
            direction : 'vertical',
            effect : 'fade',
            mousewheelControl:"false",

            // init
            onInit: function () {
                $('.scene').eq(0).addClass('active');

            },

            //  router
            onTransitionEnd: function (swiper) {

            }
        });

        function lockSwiper(){
            app.mySwiper.lockSwipes();
        }

        //lock Swiper
        lockSwiper();

        //解决click 延迟事件
        FastClick.attach(document.body);


        var error_sum = -1; //初始化用户选择 -1为未选中
        //click bin
        $('.btn').click(function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            error_sum = -1;
        })

        //count Sum
        var Count_sum = 0; //统计打错结果

        //replay btn
        $('.reply').click(function(){
            var that = $(this).parent();
            that.find('.reply').removeClass('active');
            $(this).addClass('active');
            if($(this).hasClass('dn_l')){
                that.find('.people—img').hide();
                that.find('.A_img').fadeIn();
                that.find('.p1-B-alert').removeClass('active');
                error_sum = 0;
            }else{
                that.find('.people—img').hide();
                that.find('.B_img').fadeIn();
                that.find('.p1-B-alert').addClass('active');
                error_sum = 1;
            }
        })

        //click btn_define
        $('.btn_define').click(function(){
            var that = $(this).parent();
            if(error_sum!=-1){
                if(error_sum==0){
                    that.find('.bg_zz').fadeIn();
                    that.find('.true_box').fadeIn();
                }else{
                    Count_sum += error_sum;
                    that.find('.bg_zz').fadeIn();
                    that.find('.false_box').fadeIn();
                }
            };

        })

        //提示信息弹出 click
        $('.alert_box').click(function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            error_sum = -1;
            $('.tishi').html("您答错了"+Count_sum+"次")
        })

        //  first time play BGM
        var initSound = function () {
            //  delay play
            //$('#audio')[0].play();

            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);

    }
}
$(function (){
    // init app
    app.create();
});