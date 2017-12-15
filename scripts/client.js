let category = 'people';
let pageNum = 1;

$( document ).ready( function(){
    $( '.setCategory' ).on( 'click', function(){
        category = $( this ).data( 'category' );
        pageNum = 1;
        hitSwapi();
    } );

    $( '#outputControl' ).on( 'click', '#nextButton', function(){
        pageNum++;
        hitSwapi();
    }); // end next button
    
    $( '#outputControl' ).on( 'click', '#prevButton', function(){
        pageNum--;
        hitSwapi();
    }); // end next button
}); // end doc ready

function hitSwapi(){
    console.log( 'in setCategory on click' );
    $.ajax({
        method: 'GET',
        url: 'https://swapi.co/api/' + category + '/?page=' + pageNum,
        success: function( response ){
            console.log( 'back from SWAPI with:', response );
            let outputControl = $( '#outputControl' );
            outputControl.empty();
            let numPages =  Math.floor( response.count /10 ) + 1;
            let outputString = '';
            outputString = 'Page ' + pageNum + '/' + numPages;
            if( response.previous ){
                outputString += '<button id="prevButton">Prev</button>';
            }
            else{
                outputString += '<button id="prevButton" disabled="false">Prev</button>';
            }
            if( response.next ){
                outputString += '<button id="nextButton">Next</button>';
            }
            else{
                outputString += '<button id="nextButton" disabled="false">Next</button>';
            }
            outputControl.append( outputString );                
        } //end success
    }); //end ajax
} //end hitApi on click