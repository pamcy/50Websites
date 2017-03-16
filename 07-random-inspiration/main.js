
function updateIdea(ideaNumber) {
    var randomIdea = ideas[ideaNumber];

    $("#idea").html(randomIdea.idea);
    $("#title").html(randomIdea.title);
    $("#idea-box").removeClass()
                  .addClass("animated")
                  .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    //detect when animation ends do the following thing
                    $(this).removeClass();
                });

    $("#share").attr("href", "https://twitter.com/intent/tweet?text=\"" + encodeURIComponent($("#hidden").html(randomIdea.idea).text()) + "\" https://chinyi3005.github.io/100websites/08-random-inspiration/index.html?q=" + ideaNumber);
    // encodeURIComponent encodes special characters
}

// return 0 ~ 24
function getRandomIdeaNumber() {
    return Math.floor(Math.random() * ideas.length);
}
// Math.floor() returns the largest integer less than or equal to a given number.


// length = 24
var ideas = [{"title": "A to Z List", "idea": "Make a list of something from A to Z. It could be a list of things you want to do, or a list of things that inspire you."}, {"title": "Sick Day", "idea": "What things do you like to do when you’re sick?"}, {"title": "Facts About Me", "idea": "Make a fact sheet all about you! List 10-100 random things about you that help define who you are."},{"title": "Makes Me Happy List", "idea": "What Makes you Happy? Make a list of things in your life that bring you joy."}, {"title": "Rainy Day Ideas List", "idea": "What can you do on a rainy day? Make a list of things you can do for fun or to relax while the raindrops patter on the windows."},{"title": "Inside Your Bag", "idea": "What do you keep inside your purse or briefcase or other bag you carry around with you each day?"},{"title": "The Never List", "idea": "What are things you’ve never done? Or things you know you never will do?"},{"title": "Website Lists", "idea": "Make a list of all your favorite websites and websites you visit the most often or sites you have bookmarked."},{"title": "You Need to Survive", "idea": "What couldn’t you survive without? What things do you need to have to live?"},{"idea": "Things You Know", "idea": "Make a list of all the things you’ve learned or know."},{"title": "If I Were a Zillionaire", "idea": "What would you do if you had zillions of dollars and could spend money with reckless abandon?"},{"title": "The Best Parts of Today", "idea": "Make a list of all the best parts of today! Remember: It’s those little moments in life that matter the most!"},{"title": "Favorite Smells", "idea": "What smells do you love? Whether it’s vanilla scented candles or the smell of coffee in the morning or the smell of a fresh spring rain… Make a list of all the things you love for a little aromatherapy."},{"title": "Things to Photograph", "idea": "Do you like photography? Make a list of things you would like to take pictures of."},{"title": "Places to Visit In Your City", "idea": "Where you would recommend a visitor to visit, whether it be historical landmarks, parks, or restaurants."},{"title": "Overheard Conversations", "idea": "What conversations have you overheard?"},{"title": "Inventions You Wish Existed", "idea": "What inventions do you wish existed that would make your life easier?"},{"title": "Most Embarrassing Moments", "idea": "Make a list of the things that have happened to you that were embarrassing."},{"title": "Things You’ve Searched Online", "idea": "What have you searched online for answers for in the past few days?"},{"title": "Flowers and Plants", "idea": "What are some of your favorite flowers and plants?"},{"title": "House Rules", "idea": "What are the rules of your house?"},{"title": "Best Decisions You’ve Ever Made", "idea": "Sometimes we make big decisions too – like moving somewhere new or changing your lifestyle habits. Make a list of 5 or 10 best decisions you’ve ever made."},{"title": "If I Ruled the World", "idea": "What would you do if you ruled the world? Make a list of the things you’d do differently or change."},{"title": "Bucket List", "idea": "What’s on your bucket list? What are things you’d like to do before a certain milestone in your life?"}]

$(document).ready(function(){

    $("#next-idea").on("click", function(e) {
        e.preventDefault();

        var randomIdeaNumber = getRandomIdeaNumber();
        updateIdea(randomIdeaNumber);
    });

    var q = location.search.split("?q=")[1];
    // returns the querystring part of a URL after the question mark (?)

    if (q >= 0 && q < ideas.length) { // allow 0~15
        updateIdea(q);
    } else {
        $("#next-idea").click();
    }
});
