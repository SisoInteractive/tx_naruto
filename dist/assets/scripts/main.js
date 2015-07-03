// Created by sam mok 2015(Siso brand interactive team).

"use strict";

var app = {
    loadaudio:function(){
        var audioLength = 0;
        var audioEle1 = document.getElementById("audio");
        var audioEle2 = document.getElementById("audio2");

        audioEle1.oncanplaythrough = function() {
            audioLength ++;
            if(audioLength==1){
                app.loadimg();
            }
        };
        audioEle2.oncanplaythrough = function() {
            audioLength ++;
            if(audioLength==1){
                app.loadimg();
            }
        };
    },
    loadimg: function () {

        var imgSrcArr = [
            'bg.png',
            'error.png',
            'zan.png',
            'btn-2.png',
            'btn-bg.png',
            'btn-bg2.png',
            'btn.png',
            'hengfu.png',
            'index.jpg',
            'lm01-2.png',
            'lm01.png',
            'lm02-1.png',
            'logo.png',
            'm-img.png',
            'mz01.png',
            'mz02.png',
            'p1-1.png',
            'p1-A.png',
            'p1-alert-text.jpg',
            'p1-B-alert.png',
            'p1-B.png',
            'p1-bg.jpg',
            'p1-title.png',
            'p2-1.png',
            'p2-A.png',
            'p2-alert-text.jpg',
            'p2-B.png',
            'p2-bg.jpg',
            'p2-title.png',
            'p3-1.png',
            'p3-bg.jpg',
            'p3-A.png',
            'p3-alert-text.jpg',
            'p3-B.jpg',
            'p3-title.png',
            'p4-1.png',
            'p4-A.png',
            'p4-alert-text.jpg',
            'p4-B-alert.png',
            'p4-B.png',
            'p4-bg.jpg',
            'p4-title.png',
            'p6-text.png',
            'sy01-1.png',
            'sy01.png',
            'sy02-1.png',
            'sy02.png',
            'xh01-1.png',
            'xh01.png',
            'xh02-1.png',
            'xh02.png',
            'yun-l.png',
            'yun-r.png',
            'p4-yun2.jpg',
            'p4-yun4.jpg',
            'p7-06.jpg',
            'p7-01.jpg',
            'p7-02.jpg',
            'p7-03.jpg',
            'p7-04.jpg',
            'p7-05.jpg',
            'p7-btn.png',
            'p7-btn2.png',
            'p6-btn.png',
            'p6-btn2.png',
            'p6-people.jpg',
            'p7-ko.png',
            'p6-text.png'
        ];
        var imgPath = "assets/images/";
        var imgLength = imgSrcArr.length;
        var loadedLength = 0;
        var isLoaded = false;
        var loading_val = 0;
        for (var i = 0; i < imgLength; i++) {
            var img = new Image();
            img.src = imgPath + imgSrcArr[i];

            img.onload = function () {
                loadedLength++;
                if( loading_val< 100 ){
                    loading_val +=2;
                    $('.loading-text').html(loading_val)
                }
                /* check img load progress */
                if (checkIsAllLoaded() && isLoaded == false) {
                    var runningTimerEnd = new Date();
                    isLoaded = true;
                    $('.loading_box').fadeOut();
                    $('.swiper-container').fadeIn();
                    app.create()
                }

            };
        }

        function checkIsAllLoaded () {
            var loadedRate = 1;
            return loadedLength / imgLength <= imgLength*loadedRate;
        }
    },

    create: function () {
        //load img

        //  create slider
        var app_index = 1;//now Swiper inedx
        app.mySwiper = new Swiper('.swiper-container', {
            direction : 'vertical',
            effect : 'fade',
            mousewheelControl:"false",

            // init
            onInit: function () {
                //$('.scene').eq(0).addClass('active');

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
            //console.log( app_index );
            //console.log($('.swiper-slide').eq(app_index).html())

            var that = $(this).parent();
            var This = $(this);
            that.find('.reply').removeClass('active');
            $('.active-text').hide();
            This.find('.active-text').show();
            $(this).addClass('active');
            if($(this).hasClass('dn_l')){
                that.find('.people—img').hide();
                that.find('.A_img').fadeIn();
                that.find('.p1-B-alert').removeClass('active');
                that.find('.p2-A-alert').addClass('active');
                error_sum = 0;
            }else{
                that.find('.people—img').hide();
                that.find('.B_img').fadeIn();
                that.find('.people-bg2').fadeIn();
                that.find('.p1-B-alert').addClass('active');
                that.find('.p2-A-alert').removeClass('active');
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

            var false_box_dspaly = that.find('.false_box').css('display')
            if( false_box_dspaly == 'block' ){
                var audioEle2 = document.getElementById("audio2");
                audioEle2.play();
            }

        })
        //click mp3 box
        $('.mp3-box').click(function(){
            $(this).toggleClass('active');
            $(this).attr('src','assets/images/m-img-active.png')
            if(!audio.paused){
                $('#audio')[0].pause();
            }else{
                $('#audio')[0].play();
                $(this).attr('src','assets/images/m-img.png')
            }

        })

        //r_paly
        $('#r_paly').click(function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideTo(0, 100, false);
            lockSwiper();
            error_sum=-1;
            $('.alert_box').hide();
            $('.bg_zz').hide();
            $('.reply').removeClass('active')
        })

        //fenx_btn
        $('.fenx_btn').click(function(){
            $('.fenx_btn').removeClass('active')
            $(this).addClass('active')
        })

        //提示信息弹出 click
        $('.alert_box').click(function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            app_index = app.mySwiper.activeIndex;

            error_sum = -1;
            $('.tishi').html( Count_sum )
            if(Count_sum == 0){
                $('#title').html('!作为一个资深火影迷,我竟然全部答对了')
            }else{
                $('#title').html('太羞耻了!作为一个资深火影迷,我竟然被岸本老师亲手打了'+ Count_sum + '巴掌')
            }

        })

        $('.fx_btn2').click(function(){
            app.mySwiper.unlockSwipes();
            app.mySwiper.slideNext();
            lockSwiper()
            setTimeout(function(){
                var audioEle2 = document.getElementById("audio2");
                audioEle2.play();
            },1000)
        })

        //  first time play BGM
        var initSound = function () {
            //  delay play
            $('#audio')[0].play();

            document.removeEventListener('touchstart', initSound, false);
        };
        document.addEventListener('touchstart', initSound, false);



    }
}
$(function (){
    // init app
    app.loadaudio();
});