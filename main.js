
var carousel = (function(){
    var DOM = {
        carousel: '.carousel',
        carouselItem: '.carousel_item',
        activeClass : '.active',
        arrow: '.arrow',
        arrowLeft : '.left',
        arrowRight: '.right',
        carouselTitle: '.carousel_title',
        selectItem : '.dot',
        selectArea: '.select_area',
    }
    var itemCount = document.querySelectorAll(DOM.carouselItem).length;
    var count = 0;
    let carousel = document.querySelector(DOM.carousel);
    let firstCarouselItem = document.querySelector(DOM.carouselItem);
    let activeClass = DOM.activeClass.replace('.','');
    
    let preventClick= false;
    let preventClickFunc = function(){
        preventClick = true;
        setTimeout(function(){
            preventClick = false;
        },1100);
    }
    
    var removeClass = function(position,direction,count){
        document.querySelectorAll(DOM.carouselItem)[count].classList.add(position,direction);
        carousel.style.height = document.querySelectorAll(DOM.carouselItem)[count].clientHeight + 'px';
        
        setTimeout(function(){
            document.querySelectorAll(DOM.carouselItem).forEach((element,index) => {
                if(element.classList.contains(position)){
                    element.classList.remove(position,direction);
                }
            });
        },1)
        setTimeout(function(){
            document.querySelectorAll(DOM.carouselItem).forEach((element,index) => {
                element.classList.remove(direction);
            });
            document.querySelectorAll(DOM.carouselItem)[count].classList.add(activeClass);
        },1000);
    }
    
    let time = carousel.getAttribute('data-time');
    var interval = function(){
        if(document.querySelectorAll(DOM.carouselItem)[count].classList.contains(activeClass)){
            document.querySelectorAll(DOM.carouselItem)[count].classList.add('right');
            
            if(count == itemCount - 1){
                setTimeout(function(){
                    document.querySelectorAll(DOM.carouselItem)[itemCount-1].style.display='none';
                },1000);
                document.querySelectorAll(DOM.carouselItem)[count].classList.remove(activeClass);
                firstCarouselItem.classList.add(activeClass);
                count = 0;
            }
            else{
                document.querySelectorAll(DOM.carouselItem)[count].classList.remove(activeClass);
                document.querySelectorAll(DOM.carouselItem)[count+1].classList.add(activeClass);
                
                count = count+1;
            }
            
            setTimeout(displayHiddenItem,1100);
            removeClass('next','right',count);
            preventClickFunc();
        }
    };
    
    var carouselInterval = setInterval(interval,time);
    let displayHiddenItem = function(){
        document.querySelectorAll(DOM.carouselItem).forEach(function(element){
            if(element.style.display =='none'){
                element.style.display = 'block';
            }
        })
    }
    
    var firstInit = function(){
        firstCarouselItem.classList.add(activeClass);
        carousel.style.height = document.querySelectorAll(DOM.carouselItem)[count].clientHeight + 'px';
        
        handleClickArrow();
        handleClickDot();
    }
    
    var handleClickArrow = function(){
        let arrowLeft = DOM.arrow.replace('.','') + DOM.arrowLeft.replace('.',' ');
        let arrowRight = DOM.arrow.replace('.','')+ DOM.arrowRight.replace('.',' ');
        carousel.insertAdjacentHTML('afterbegin',`<div class="${arrowLeft}"> < </div>
        <div class="${arrowRight}"> > </div>
        `);
        
        //arrow left//
        document.querySelector(DOM.arrow+DOM.arrowLeft).addEventListener('click',function(){
            if(preventClick == false){
                clearInterval(carouselInterval);
                document.querySelectorAll(DOM.carouselItem)[count].classList.add('left');
                document.querySelectorAll(DOM.carouselItem)[count].classList.remove(activeClass);
                if(count-1<0){
                    count = itemCount-1;
                }
                else{
                    count = count-1;
                    setTimeout(function(){
                        document.querySelectorAll(DOM.carouselItem)[count+1].style.display='none';
                    },1000);
                }
                document.querySelectorAll(DOM.carouselItem)[count].classList.add(activeClass);
                
                setTimeout(displayHiddenItem,1100);
                carouselInterval = setInterval(interval,time);
                removeClass('prev','left',count);
                
                preventClickFunc();
            }
        });
        
        //arrow right//
        document.querySelector(DOM.arrow+DOM.arrowRight).addEventListener('click',function(){   
            if(preventClick==false){
                clearInterval(carouselInterval);
                document.querySelectorAll(DOM.carouselItem)[count].classList.add('right');
                document.querySelectorAll(DOM.carouselItem)[count].classList.remove(activeClass);
                if(count == itemCount-1){
                    setTimeout(function(){
                        document.querySelectorAll(DOM.carouselItem)[itemCount-1].style.display='none';
                    },1000);
                    count=0;
                }
                else{
                    count = count+1;
                }                    
                document.querySelectorAll(DOM.carouselItem)[count].classList.add(activeClass);
                
                setTimeout(displayHiddenItem , 1100);
                carouselInterval = setInterval(interval,time);
                removeClass('next','right',count);
                
                preventClickFunc();
                
            }
        });
    }
    
    var handleClickDot = function(){
        let selectItemClass = DOM.selectItem.replace('.',' ');
        let templateForSelectItem = '';
        for (let i = 1; i<=itemCount;i++){
            templateForSelectItem += `<div class="${selectItemClass}"></div>`;
        }
        carousel.querySelector(DOM.selectArea).insertAdjacentHTML('beforeend' , templateForSelectItem);
        document.querySelectorAll(DOM.selectItem).forEach((element,index) => {
            element.addEventListener('click',function(){
                if(preventClick == false){
                    clearInterval(carouselInterval);
                    let oldIndex = count;
                    document.querySelectorAll(DOM.carouselItem)[oldIndex].classList.remove(activeClass);
                    document.querySelectorAll(DOM.carouselItem)[index].classList.add(activeClass);
                    count = index;
                    if(index < oldIndex){
                        setTimeout(function(){
                            document.querySelectorAll(DOM.carouselItem)[oldIndex].style.display='none';
                        },1000);
                        setTimeout(displayHiddenItem , 1100);
                        document.querySelectorAll(DOM.carouselItem)[oldIndex].classList.add('left');
                        removeClass('prev','left',count);
                    }
                    else{
                        document.querySelectorAll(DOM.carouselItem)[oldIndex].classList.add('right');
                        removeClass('next','right',count);
                    }
                    carouselInterval = setInterval(interval,time);
                    preventClickFunc();
                }
            })
        });
        
    }
    
    return {
        init: function(){
            firstInit();
        }
    }
})();
carousel.init();