// Dean Attali / Beautiful Jekyll 2016
var main = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
            $(".navbar-custom .avatar-container").fadeOut(500);
        } else {
            $(".navbar").removeClass("top-nav-short");
            $(".navbar-custom .avatar-container").fadeIn(500);
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // On mobile, when clicking on a multi-level navbar menu, show the child links
    $('#main-navbar').on("click", ".navlinks-parent", function(e) {
      var target = e.target;
      $.each($(".navlinks-parent"), function(key, value) {
        if (value == target) {
          $(value).parent().toggleClass("show-children");
        } else {
          $(value).parent().removeClass("show-children");
        }
      });
    });

    // Ensure nested navbar menus are not longer than the menu header
    var menus = $(".navlinks-container");
    if (menus.length > 0) {
      var navbar = $("#main-navbar ul");
      var fakeMenuHtml = "<li class='fake-menu' style='display:none;'><a></a></li>";
      navbar.append(fakeMenuHtml);
      var fakeMenu = $(".fake-menu");

      $.each(menus, function(i) {
        var parent = $(menus[i]).find(".navlinks-parent");
        var children = $(menus[i]).find(".navlinks-children a");
        var words = [];
        $.each(children, function(idx, el) { words = words.concat($(el).text().trim().split(/\s+/)); });
        var maxwidth = 0;
        $.each(words, function(id, word) {
          fakeMenu.html("<a>" + word + "</a>");
          var width =  fakeMenu.width();
          if (width > maxwidth) {
            maxwidth = width;
          }
        });
        $(menus[i]).css('min-width', maxwidth + 'px')
      });

      fakeMenu.remove();
    }

    // show the big header image
    main.initImgs();
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      main.bigImgEl = $("#header-big-imgs");
      main.numImgs = main.bigImgEl.attr("data-num-img");

          // 2fc73a3a967e97599c9763d05e564189
	  // set an initial image
	  var imgInfo = main.getImgInfo();
	  var src = imgInfo.src;
	  var desc = imgInfo.desc;
  	  main.setImg(src, desc);

	  // For better UX, prefetch the next image so that it will already be loaded when we want to show it
  	  var getNextImg = function() {
	    var imgInfo = main.getImgInfo();
	    var src = imgInfo.src;
	    var desc = imgInfo.desc;

		var prefetchImg = new Image();
  		prefetchImg.src = src;
		// if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

  		setTimeout(function(){
                  var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
  		  $(".intro-header.big-img").prepend(img);
  		  setTimeout(function(){ img.css("opacity", "1"); }, 50);

		  // after the animation of fading in the new image is done, prefetch the next one
  		  //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		  setTimeout(function() {
		    main.setImg(src, desc);
			img.remove();
  			getNextImg();
		  }, 1000);
  		  //});
  		}, 6000);
  	  };

	  // If there are multiple images, cycle through them
	  if (main.numImgs > 1) {
  	    getNextImg();
	  }
    }
  },

  getImgInfo : function() {
  	var randNum = Math.floor((Math.random() * main.numImgs) + 1);
    var src = main.bigImgEl.attr("data-img-src-" + randNum);
	var desc = main.bigImgEl.attr("data-img-desc-" + randNum);

	return {
	  src : src,
	  desc : desc
	}
  },

  setImg : function(src, desc) {
	$(".intro-header.big-img").css("background-image", 'url(' + src + ')');
	if (typeof desc !== typeof undefined && desc !== false) {
	  $(".img-desc").text(desc).show();
	} else {
	  $(".img-desc").hide();
	}
  }
};

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', main.init);


//My Functions
//Score to rating
let score_rate = (score_num, low_high) => {
  let score_rate_val = "";
  if (low_high==2) {
      if (score_num==1) {
          score_rate_val = "High Sell/Consolidate";
      } else if (score_num==2) {
          score_rate_val = "Sell/Consolidate";
      } else if (score_num==3) {
          score_rate_val = "Unclear";
      } else if (score_num==4) {
          score_rate_val = "Hodl";
      } else if (score_num==5) {
          score_rate_val = "High Hodl";
      }
  } else if (low_high==1) {
      if (score_num==5) {
          score_rate_val = "High Sell/Consolidate";
      } else if (score_num==4) {
          score_rate_val = "Sell/Consolidate";
      } else if (score_num==3) {
          score_rate_val = "Unclear";
      } else if (score_num==2) {
          score_rate_val = "Hodl";
      } else if (score_num==1) {
          score_rate_val = "High Hodl";
      }
  }
  return score_rate_val;
}

//Weighted Score to rating
let weight_rate = (rate_val) => {
  if (rate_val=="High Sell/Consolidate" || rate_val=="High Hodl") {
      weighted_score = 2
  } else {
      weighted_score = 1
  }
  return weighted_score;
}

//Hodl/Sell/Unclear
let hsc_cat = (rate_val) => {
  let cat = "";
  if (rate_val=="Hodl" || rate_val=="High Hodl") {
      cat = "Hodl"
  } else if (rate_val=="Unclear") {
      cat = "Unclear"
  } else  {
      cat = "Sell/Consolidate"
  }
  return cat;
}

let hsc_score = (cat_val, score_num, spec_cat) => {
  if (cat_val == spec_cat){
      score = score_num;
  }   else {
      score = 0;
  }
  return score
}


//Rating of scores with weighting
let rateit = (section_num, part_num) => {
  //Get field scores
  let hsc_1_1 = field1_1.value;
  let hsc_1_2 = field1_2.value;
  let hsc_1_3 = field1_3.value;
  let hsc_1_4 = field1_4.value;
  let hsc_1_5 = field1_5.value;
  let hsc_2_1 = field2_1.value;
  let hsc_2_2 = field2_2.value;
  let hsc_2_3 = field2_3.value;
  let hsc_2_4 = field2_4.value;
  let hsc_2_5 = field2_5.value;
  let hsc_3_1 = field3_1.value;
  let hsc_3_2 = field3_2.value;
  let hsc_3_3 = field3_3.value;
  let hsc_3_4 = field3_4.value;
  let hsc_3_5 = field3_5.value;
  let hsc_4_1 = field4_1.value;
  let hsc_4_2 = field4_2.value;
  let hsc_4_3 = field4_3.value;
  let hsc_4_4 = field4_4.value;

  //Add to an array
  let scoreArr = [];
  scoreArr[0] = hsc_1_1;
  scoreArr[1] = hsc_1_2;
  scoreArr[2] = hsc_1_3;
  scoreArr[3] = hsc_1_4;
  scoreArr[4] = hsc_1_5;
  scoreArr[5] = hsc_2_1;
  scoreArr[6] = hsc_2_2;
  scoreArr[7] = hsc_2_3;
  scoreArr[8] = hsc_2_4;
  scoreArr[9] = hsc_2_5;
  scoreArr[10] = hsc_3_1;
  scoreArr[11] = hsc_3_2;
  scoreArr[12] = hsc_3_3;
  scoreArr[13] = hsc_3_4;
  scoreArr[14] = hsc_3_5;
  scoreArr[15] = hsc_4_1;
  scoreArr[16] = hsc_4_2;
  scoreArr[17] = hsc_4_3;
  scoreArr[18] = hsc_4_4;

  //Assign a Character value for items
  if (section_num==1){
      if (part_num==1){
          let score1_1 = score_rate(scoreArr[0], 2);
          return score1_1;
      } else if (part_num==2) {
          let score1_2 = score_rate(scoreArr[1], 2);
          return score1_2;
      } else if (part_num==3) {
          let score1_3 = score_rate(scoreArr[2], 2);
          return score1_3;
      } else if (part_num==4) {
          let score1_4 = score_rate(scoreArr[3], 2);
          return score1_4;
      } else if (part_num==5) {
          let score1_5 = score_rate(scoreArr[4], 2);
          return score1_5;
      }
      
  } else if (section_num==2) {
      if (part_num==1){
          let score2_1 = score_rate(scoreArr[5], 2);
          return score2_1;
      } else if (part_num==2) {
          let score2_2 = score_rate(scoreArr[6], 2);
          return score2_2;
      } else if (part_num==3) {
          let score2_3 = score_rate(scoreArr[7], 2);
          return score2_3;
      } else if (part_num==4) {
          let score2_4 = score_rate(scoreArr[8], 2);
          return score2_4;
      } else if (part_num==5) {
          let score2_5 = score_rate(scoreArr[9], 2);
          return score2_5;
      }

  } else if (section_num==3) {
      if (part_num==1){
          let score3_1 = score_rate(scoreArr[10], 2);
          return score3_1;
      } else if (part_num==2) {
          let score3_2 = score_rate(scoreArr[11], 1);
          return score3_2;
      } else if (part_num==3) {
          let score3_3 = score_rate(scoreArr[12], 1);
          return score3_3;
      } else if (part_num==4) {
          let score3_4 = score_rate(scoreArr[13], 1);
          return score3_4;
      } else if (part_num==5) {
          let score3_5 = score_rate(scoreArr[14], 2);
          return score3_5;
      }

  } else if (section_num==4) {
      if (part_num==1){
          let score4_1 = score_rate(scoreArr[15], 2);
          return score4_1;
      } else if (part_num==2) {
          let score4_2 = score_rate(scoreArr[16], 1);
          return score4_2;
      } else if (part_num==3) {
          let score4_3 = score_rate(scoreArr[17], 1);
          return score4_3;
      } else if (part_num==4) {
          let score4_4 = score_rate(scoreArr[18], 1);
          return score4_4;
      } 
  }

}

