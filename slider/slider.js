// slider.js

function slider(dom){
  if(!dom&&typeof dom != 'object'){
    return; 
  }
  this.slider = dom;
  this.sliderGroup = dom.children[0];
  this.sliderItemLength = this.sliderGroup.children.length-2;
  this.sliderWidth = dom.clientWidth;
  this.currentIndex = 1;
  let _this = this;
  this.transitionEnd=(callback)=>{// 在过渡结束时执行回掉函数
  this.sliderGroup.addEventListener('transitionend',()=>{
    callback&&callback();
  })
   this.sliderGroup.addEventListener('webkitTransitionEnd',()=>{
    callback&&callback();
  })
}

  this.addTransition=()=>{
    this.sliderGroup.style.transition = "all .9s ease-in-out";// 过渡时间必须比定时器的时间短
    this.sliderGroup.style.webkitTransition = "all .9s ease-in-out";
  }

  this.removeTransition=()=>{// 移除过渡动画
    this.sliderGroup.style.transition = "";
    this.sliderGroup.style.webkitTransition = "";
  }

  this.setTranslateX=(translateX)=>{// 定位
    this.sliderGroup.style.transform = "translateX(" + translateX + "px)";
    this.sliderGroup.style.webkitTransform = "translateX(" + translateX + "px)";
  }

  this.slideLoop=()=>{// 自动循环播放
    this.timer=setInterval(()=>{
      this.currentIndex++;
      this.addTransition();
      this.setTranslateX(-this.currentIndex*this.sliderWidth);
    },1000)
  }
  this.getCurrentIndex=()=>{// 获取当前页面索引
    return this.currentIndex;
  }
  this.on=(type,callback)=>{// 对外暴露事件监听接口
    this.sliderGroup.addEventListener(type,()=>{callback()});
  }
  this.addTouch=()=>{
    console.log(_this);
    this.sliderGroup.addEventListener('touchstart',function(event){
      clearInterval(_this.timer);
      this.startX=event.touches[0].clientX;
      this.move=false;
    });
    this.sliderGroup.addEventListener('touchmove',function(event){
      this.move=true;
      this.moveX=event.touches[0].clientX;
      this.distanceX =this.moveX-this.startX;// 移动的距离
      _this.removeTransition.call(_this);
      _this.setTranslateX.call(_this,-_this.currentIndex*_this.sliderWidth+this.distanceX);
    });
    this.sliderGroup.addEventListener('touchend',function(){
      if(this.move&&Math.abs(this.distanceX)>_this.sliderWidth/3){
        if(this.distanceX>0){
          _this.currentIndex--;
        }else{
          _this.currentIndex++;
        }
      }
      _this.addTransition.call(_this);
      _this.setTranslateX.call(_this,-_this.currentIndex*_this.sliderWidth);
      if(_this.currentIndex>_this.sliderItemLength){
        _this.currentIndex = 1;
      }else if(_this.currentIndex<=0){
        _this.currentIndex = _this.sliderItemLength;  
      }

      _this.slideLoop.call(_this);
    })
  }
  this.setTranslateX(-this.currentIndex*this.sliderWidth);
  this.slideLoop();
  this.transitionEnd(()=>{
    if(this.currentIndex>this.sliderItemLength){
      this.currentIndex=1;
      this.removeTransition();
      this.setTranslateX(-this.currentIndex*this.sliderWidth);
    }else if(this.currentIndex<=0){
      this.currentIndex = this.sliderItemLength;
      this.removeTransition();
      this.setTranslateX(-this.currentIndex*this.sliderWidth);
    }
  });
  this.addTouch();
  
}
