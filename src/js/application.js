'use strict';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

/*
  Surf height description
*/

var directions = document.querySelectorAll('.directions__direction');

if (directions) {
  for (var i = 0; i < directions.length; i ++) {
    var thisBreaks = directions[i].querySelectorAll('.surfbreak');

    // SET DESCRIPTIVE SURF CONDITIONS
    var thisAverage = directions[i].getAttribute('data-height-mean');
    var setSurfConditions = function(surfConditions) {
      directions[i].querySelector('.direction__height').innerHTML = surfConditions;
    };
    if (thisAverage < 1) {
      setSurfConditions('flat');
    } else if (thisAverage >= 1 && thisAverage < 2) {
      setSurfConditions('small');
    } else if (thisAverage >= 2 && thisAverage < 3) {
      setSurfConditions('not bad');
    } else if (thisAverage >= 3 && thisAverage < 5) {
      setSurfConditions('good');
    } else if (thisAverage >= 5 && thisAverage < 7) {
      setSurfConditions('firing');
    } else if (thisAverage >= 7) {
      setSurfConditions('massive');
    }
  }

  //
  // var wind            = document.querySelector('.wind');
  // var needle          = document.querySelector('.wind-compass__needle path');
  // var windDirection   = wind.getAttribute('data-wind-direction');
  // // wind-compass__needle
  // needle.setAttribute('style', 'transform: rotate('+ windDirection +'deg);')
  // console.log(windDirection);

  /*
    CREATE CAROUSELS
  */

  var width = 500,
      widthSegment = (width/5),
      height = 300;

  var shoreDirections = ['north','west','east','south'];
  var tideGraphs = document.querySelectorAll('.tide__graph');
  for (var tideIndex = 0; tideIndex < tideGraphs.length; tideIndex++) {
    var tidesData     = tideGraphs[tideIndex].getAttribute('data-tides').replace('["','').replace('"]','').split('","');
    var timesData     = tideGraphs[tideIndex].getAttribute('data-times').replace('["','').replace('"]','').split('","');
    var timeLabelData = tideGraphs[tideIndex].getAttribute('data-time-labels').replace('["','').replace('"]','').split('","');
    console.log('tidesData', tidesData)
    console.log('timesData', timesData)
    console.log('timeLabelData', timeLabelData)

    var lineData = [ { "x": 0,              "y": height},
                     { "x": 0,              "y": height/2},
                     { "x": widthSegment,   "y": (height/2) - (height/4)*tidesData[0]},
                     { "x": widthSegment*2, "y": (height/2) - (height/4)*tidesData[1]},
                     { "x": widthSegment*3, "y": (height/2) - (height/4)*tidesData[2]},
                     { "x": widthSegment*4, "y": (height/2) - (height/4)*tidesData[3]},
                     { "x": widthSegment*5, "y": height/2},
                     { "x": widthSegment*5, "y": height}
                   ];

    var svgContainer = d3.select(".tide__graph[data-shore="+ shoreDirections[tideIndex] +"]").attr('viewBox', '0 0 '+ width +' '+height+'');

    var line = d3.svg.line();

    var tideFunction  = d3.svg.line()
                              .x(function(d) {
                                return d.x;
                              })
                              .y(function(d) {
                                return d.y;
                              }).interpolate("monotone");

    var tideAttributes  = svgContainer.append("path").attr('d', tideFunction(lineData));

    var graphMarks      = svgContainer.append("line").attr('x1', widthSegment).attr('y1', 0).attr('x2', widthSegment).attr('y2', height).attr('stroke-width', '.0025');
    var graphMarks1     = svgContainer.append("line").attr('x1', widthSegment*2).attr('y1', 0).attr('x2', widthSegment*2).attr('y2', height).attr('stroke-width', '.0025');
    var graphMarks2     = svgContainer.append("line").attr('x1', widthSegment*3).attr('y1', 0).attr('x2', widthSegment*3).attr('y2', height).attr('stroke-width', '.0025');
    var graphMarks3     = svgContainer.append("line").attr('x1', widthSegment*4).attr('y1', 0).attr('x2', widthSegment*4).attr('y2', height).attr('stroke-width', '.0025');

    var graphHeight     = svgContainer.append("text").attr('x', widthSegment  ).attr('y', 60).text(Math.round(tidesData[0] * 100) / 100 + 'ft');
    var graphHeight1    = svgContainer.append("text").attr('x', widthSegment*2).attr('y', 60).text(Math.round(tidesData[1] * 100) / 100 + 'ft');
    var graphHeight2    = svgContainer.append("text").attr('x', widthSegment*3).attr('y', 60).text(Math.round(tidesData[2] * 100) / 100 + 'ft');
    var graphHeight3    = svgContainer.append("text").attr('x', widthSegment*4).attr('y', 60).text(Math.round(tidesData[3] * 100) / 100 + 'ft');

    var graphTime       = svgContainer.append("text").attr('x', widthSegment  ).attr('y', 280).text(timesData[0]);
    var graphTime1      = svgContainer.append("text").attr('x', widthSegment*2).attr('y', 280).text(timesData[1]);
    var graphTime2      = svgContainer.append("text").attr('x', widthSegment*3).attr('y', 280).text(timesData[2]);
    var graphTime3      = svgContainer.append("text").attr('x', widthSegment*4).attr('y', 280).text(timesData[3]);

    var graphLabel      = svgContainer.append("text").attr('x', widthSegment).attr('y',   40).text(timeLabelData[0]);
    var graphLabel1     = svgContainer.append("text").attr('x', widthSegment*2).attr('y', 40).text(timeLabelData[1]);
    var graphLabel2     = svgContainer.append("text").attr('x', widthSegment*3).attr('y', 40).text(timeLabelData[2]);
    var graphLabel3     = svgContainer.append("text").attr('x', widthSegment*4).attr('y', 40).text(timeLabelData[3]);
  }

}



// media query event handler
if (matchMedia) {
  var mq = window.matchMedia("(max-width: 639px)");
  mq.addListener(mobileListener);
  mobileListener(mq);
}

// media query change
function mobileListener(mq) {

  if (mq.matches) {
    for (var i = 0; i < directions.length; i++) {
      var thisDirection = directions[i];
      addClass(thisDirection, 'directions__direction--dropdown');

      var toggleMobile = thisDirection.querySelector('.toggle-mobile');
      toggleMobile.addEventListener('click', function() {
        if ( hasClass(this.parentNode, 'directions__direction--dropdown-active') ) {
          removeClass(this.parentNode, 'directions__direction--dropdown-active');
        } else {
          addClass(this.parentNode, 'directions__direction--dropdown-active');
        }
      })
    }
  }
  else {
    for (var i = 0; i < directions.length; i++) {
      removeClass(directions[i], 'directions__direction--dropdown');
    }
  }

}