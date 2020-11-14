#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sam's Discussion</title>
    </head>

    <body>
        <header>
            <h1>PIC 40A Discussion</h1>
        </header>

        <main>
            <span>Hi! Welcome to this page!</span>
            <?php echo '<p>Hello world!</p>'; ?>

            <p style="display: none;" id="communication">
                <?php
                    $arr = array(1, 2, 3);
                    $arr_length = array_push($arr, 4, 5, 6); 
                    $last_element = array_pop($arr);

                    $arr_length_again = count($arr);
                    sort($arr); // sort only works coherently/consistently 
                    // if all elements are the same type

                    // We can use implode to stitch an array into a string:
                    $to_string = implode(",", $arr);

                    // all arrays in PHP are secretly associative,
                    //    containing key-value pairs. By default,
                    //    the keys are just the index values (0, 1, 2).
                    //    Relatedly, keys can be numbers as well as strings
                    //    in PHP.
                    $arr_associative = array('span'=>'onSpan', 'input'=>'onInput');
                    
                    $to_string_associative = implode(",", $arr_associative);
                    // implode ignores keys when stitching together an array;
                    //    this makes sense when you consider that all arrays have 
                    //    keys which are just their value's index locations, and
                    //    it makes sense to not want those to appear when stitching
                    //    together a standard array
                
                    // similarly, we can convert a string into an array using explode:
                    $some_string = "span onSpan,input onInput";
                    $from_string = explode(",", $some_string);
                    $toJS = [];

                    foreach($from_string as $pair) { 
                        // first argument is array name, second is what the local name
                        //    for the current element in the array will be
                        $local = explode(" ", $pair);
                        $toJS[$local[0]] = $local[1]; // use 0th element as key, 1st as value
                        // note that there was no special syntax needed to create an associative
                        //    array, as all arrays are technically associative.
                    }
                    // Let's say we want to communicate this array data to our JavaScript.
                    // That's tricky! The standard way to do this is to use AJAX.
                    // There are two 'silly' ways we can do this, with what we know so far:
                    //    1) Echo that data into our page, and then use JS to pull the data
                    //       from the DOM.
                    //    2) Echo that data directly into JavaScript

                    // Here's technique 1 -- we've echoed it into an element
                    //    and have accessed it down below in our JavaScript:
                    echo json_encode($toJS);
                ?>
            </p>
        </main>
    </body>
</html>

<script>
    function onSpan() {
        console.log("clicked on a span");
    }

    function onInput() {
        console.log("clicked on an input");
    }

    // Technique 1 continued --
    // Now we can access the information we had PHP store, and 
    //    parse it into an object using JSON.parse
    let element = document.getElementById('communication');
    let data = JSON.parse(element.textContent);
    console.log(data);

    // window's an object which gives us access to everything which is 
    //    globally available in the current tab -- including the functions
    //    we defined above.
    console.log(window);

    // we can now loop through, say, all [key] elements we have and assign them an 
    //    event listener of [value] (by looking up [value] in our window object):
    for(let key in data) {
        let elements = document.getElementsByTagName(key);
        
        // if elements is empty, this just won't execute, so we won't encounter issues
        for(let i = 0; i < elements.length; ++i) {
            elements[i].addEventListener('click', window[data[key]]);
        }
    }

    // Here's technique 2, we're going to echo the data directly into a variable
    let other_data = <?php echo json_encode($toJS); ?>;
    console.log(other_data);
</script>
