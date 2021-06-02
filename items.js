var items = {
  title: "Product is Served",
  description: "What if real-world services behaved like digital products? <br>Created by <a href='https://www.linkedin.com/in/ghenriques/' target='_blank'><u>Gonçalo Henriques</u></a>",
  social: [
      {
        icon: "fa-instagram",
        name: "Instagram",
        alt: "Instagram",
        link: "https://instagram.com/productisserved"
      },
      {
        icon: "fa-twitter",
        name: "Twitter",
        alt: "Twitter",
        link: "https://twitter.com/ProductIsServed"
      }
  ],
  buttons: [
    {
      name: "Product Articles",
      link: "https://medium.com/@gonelf"
    }
  ],
  posts: [
    {
      title: "Signup is Served",
      images: [
        "./pics/pic1.JPG",
        "./pics/pic2.JPG",
        "./pics/pic3.JPG",
        "./pics/pic4.JPG",
        "./pics/pic5.JPG"
      ]
    }
  ]
}
function makeCarrousel(title, indicators, pics){
  return ''+
  '<div class="card mt-4 mb-4">'+
  '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">'+
  // '<ol class="carousel-indicators">'+
  // indicators+
  // '</ol>'+
  '<div class="carousel-inner">'+
  pics+
  '</div>'+
  '<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">'+
  '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
  '<span class="sr-only">Previous</span>'+
  '</a>'+
  '<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">'+
  '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
  '<span class="sr-only">Next</span>'+
  '</a>'+
  '</div>'+
  '<div class="card-body">'+
    '<p class="card-text">'+title+'</p>'+
  '</div>'+
  '</div>';
}

function loadPosts(posts){
  var res="";
  $.each(posts, function(key, post){
    var imgs="", indicators="";
    $.each(post.images, function(key, image){
      imgs += '<div class="carousel-item '+(key==0?"active":"")+'">'+
        '<img class="d-block w-100" src="'+image+'" alt="'+image+'">'+
      '</div>';
      indicators += '<li data-target="#carouselExampleIndicators" data-slide-to="'+key+'" '+(key==0?'class="active"':'')+'></li>';
    });
    res += makeCarrousel(post.title, indicators, imgs);
  });
  return res;
}

function loadSocial(social){
  var res = "";
  $.each(social, function(key, item){
    res += '<a href="'+item.link+'" target="_blank" class="fa '+item.icon+'" alt="'+item.alt+'"></a>';
  })
  return res;
}

function loadButtons(buttons){
  var res = "";
  $.each(buttons, function(key, button){
    res += '<div style="padding-bottom: 30px;">'+
        '<a href="'+button.link+'" type="button" target="_blank" class="btn btn-outline-light" style="width: 80%; padding-top:10px; padding-bottom:10px; font-weight: 600;">'+button.name+'</a>'+
    '</div>';
  })
  return res;
}

function loadItems(items) {
  var head = $("head").html();
  var body = $("body").html();
  $.each(items, function(key, value){
    switch (key) {
      case "social":
        value = loadSocial(value);
        break;
      case "buttons":
        value = loadButtons(value);
        break;
      case "posts":
        value = loadPosts(value);
        break;
    }
    head = head.replaceAll("{{"+key+"}}", value);
    body = body.replaceAll("{{"+key+"}}", value);
  });
  $("head").html(head);
  $("body").html(body);
}

$(document).ready(function() {
  loadItems(items);
   $(document).on('swiperight', ".carousel", function() {
      $(this).carousel('prev');
    });
   // $(".carousel").swipeleft(function() {
   //    $(this).carousel('next');
   // });
});
