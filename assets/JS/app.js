// ==========================grid layout
$(document).ready(function () {
    // init Isotope
    $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,

        masonry: {
            columnWidth: '.grid-sizer'
        },

    });
    // layout Isotope after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });
});


// ===================================copy link
function copyToClipboard() {
    var textInput = document.getElementById("textInput");
    var copiedText = document.getElementById("copiedText");
    textInput.select();
    textInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    // Show the "Copied" text
    copiedText.style.display = "block";

    // Hide the "Copied" text after 2 seconds
    setTimeout(function () {
        copiedText.style.display = "none";
    }, 2000);
}

// ===========================================tags add remove

var fullText = $("#text").text();
var words = fullText.split(" ");
var initialText = words.slice(0, 50).join(" ");
var remainingText = words.slice(50).join(" ");

$("#text").html(`${initialText}<span class="ellipsis">...</span><span class="more-text" style="display: none;">${remainingText}</span>`);

window.toggleText = function () {
    var $moreText = $(".more-text");
    var $ellipsis = $(".ellipsis");
    var $btnText = $("#readMoreBtn");

    if ($moreText.css("display") === "none") {
        $moreText.css("display", "inline");
        $ellipsis.css("display", "none");
        $btnText.text("Read Less");
    } else {
        $moreText.css("display", "none");
        $ellipsis.css("display", "inline");
        $btnText.text("Read More");
    }
};

function getFiltersFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var filters = urlParams.get('filters');
    return filters ? filters.split(',') : [];
}

$(document).ready(function () {
    // Set initial value of share input
    $("#textInput").val(window.location.href);

    function updateURL() {
        var selectedTags = [];
        $('.selected-tag').each(function () {
            selectedTags.push($(this).text().trim());
        });

        var urlParams = new URLSearchParams(window.location.search);

        if (selectedTags.length > 0) {
            urlParams.set('filters', selectedTags.join(','));
        } else {
            urlParams.delete('filters');
        }

        var newUrl = window.location.pathname;
        var queryString = urlParams.toString();
        if (queryString) {
            newUrl += '?' + queryString;
        }

        window.history.replaceState(null, '', newUrl);

        $("#textInput").val(window.location.href);
    }

    $('.filter-list').on('click', '.select-tag', function () {
        var $this = $(this);
        var text = $this.text();
        $this.parent().remove();

        var newTag = $('<div class="selected-tag d-flex">' + text + '<i class="bi bi-x-lg ms-2 remove-tag"></i></div>');
        $('.selected-tags').append(newTag);

        updateURL();
    });

    $('.selected-tags').on('click', '.remove-tag', function () {
        var $this = $(this);
        var text = $this.parent().text().trim();
        $this.parent().remove();

        var newLi = $('<li><button class="select-tag d-flex">' + text + '<i class="bi bi-plus-lg ms-2 d-lg-none d-block "></i></button></li>');
        $('.filter-list').append(newLi);

        updateURL();
    });

    // Load filters from URL on page load
    var initialFilters = getFiltersFromURL();
    initialFilters.forEach(function (filter) {
        var newTag = $('<div class="selected-tag">' + filter + ' <i class="bi bi-x-lg ms-2 remove-tag"></i></div>');
        $('.selected-tags').append(newTag);

        $('.filter-list li').each(function () {
            if ($(this).text().trim() === filter) {
                $(this).remove();
            }
        });
    });

    $("#imagepreview").on("show.bs.modal", function () {
        var $moreText = $(".more-text");
        var $ellipsis = $(".ellipsis");
        var $btnText = $("#readMoreBtn");

        $moreText.css("display", "none");
        $ellipsis.css("display", "inline");
        $btnText.text("Read More");
    })
});
