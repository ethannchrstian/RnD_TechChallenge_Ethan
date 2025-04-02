// select semua image dalam carousel
let slideImages = document.querySelectorAll('img');

// Select buttonsnya
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

//Select dots indicatornya
let dots = document.querySelectorAll('.dot');

//variabel untuk track di image ke berapa
var counter = 0;

// Event listener ketika mouse click untuk ke next image
next.addEventListener('click', slideNext);

//function untuk next slide
function slideNext(){

    //animasinya
    slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';

    //update counter ke next image, kalau di image terakhir loop ke image pertama
    if(counter >= slideImages.length-1){
        counter = 0;
    }
    else{
        counter++;
    }

    //animasi
    slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';

    //update dot indikatornya
    indicators();
}

// CLick event listener sekarang untuk prev image, disini codenya mirip nextslide
prev.addEventListener('click', slidePrev);

//function prev image
function slidePrev(){
    //animasi
    slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
    
    //update counter ke prev image, kalau di image pertama loop ke image terakhir
    if(counter == 0){
        counter = slideImages.length-1;
    }
    else{
        counter--;
    }
    //animasi
    slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
    indicators();
}

//function untuk dot indikator (yg mana image aktif)
function indicators(){
    //loop untuk remove class aktifnya
    for(i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(' active', '');
    }

    //membuat image yg sedang dilihat menjadi yg aktif
    dots[counter].className += ' active';
}

// ini saya tambahkan event listener untuk arrow sign di keyboard
document.addEventListener('keydown', function(e) {
if (e.key === 'ArrowRight') {
    slideNext();
} else if (e.key === 'ArrowLeft') {
    slidePrev();
}
});

// function ketika dot ada diclick
function switchImage(currentImage){
    //membuat dot tersebut jadi dot aktif
    currentImage.classList.add('active');
    //cari posisisnya 
    var imageId = currentImage.getAttribute('attr');

    //if conditions berdasarkan dot mana yg ditekan, dot posisi sama, dot didepan, dot diblkng
    if(imageId > counter){
        slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
        counter = imageId;
        slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
    }
    else if(imageId == counter){
        return;
    }
    else{
        slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
        counter = imageId;
        slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';	
    }
    indicators();
}
