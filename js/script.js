var allowedTypes = ['png', 'jpg', 'jpeg', 'gif'],
    fileInput = document.querySelector('#file'),
    prev = document.querySelector('#prev'),
    defaultlabel = "Cliquer ou glisser un/des fichier(s) pour les upload&hellip;";

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

document.querySelector('.dropper').addEventListener('dragover', function(e) {

    e.preventDefault(); // Annule l'interdiction de drop
    document.querySelector('#fileinputlabel').innerHTML = "";
    document.querySelector('.box').className += " dragging";
});
document.querySelector('.dropper').addEventListener('dragleave', function(e) {

    e.preventDefault();

    document.querySelector('#fileinputlabel').innerHTML = defaultlabel;

    console.log(document.getElementById("box").className.replace('dragging',''));

    document.getElementById("box").className =
        document.getElementById("box").className.replaceAll('dragging','');

});
document.querySelector('.dropper').addEventListener('drop', function(e) {

    e.preventDefault();
    document.getElementById("box").className =
        document.getElementById("box").className.replaceAll('dragging','');
    document.querySelector('#fileinputlabel').innerHTML = defaultlabel;
    start(e.dataTransfer.files);

});
fileInput.addEventListener('change', function() {
    start(this.files)

});
function start(files){

    var filesLen = files.length,
        imgType;

    for (var i = 0; i < filesLen; i++) {

        imgType = files[i].name.split('.');
        imgType = imgType[imgType.length - 1].toLowerCase(); // On utilise toLowerCase() pour éviter les extensions en majuscules

        if (allowedTypes.indexOf(imgType) != -1 && files[i].size < 1000000) {
            createThumbnail(files[i]);
        }
        else{
            document.querySelector('#fileinputlabel').innerHTML = "Taille ou extension non correct";
        }

    }
}
function createThumbnail(file) {
    var reader = new FileReader();
    reader.addEventListener('load', function() {

        var listElement = document.createElement('div');
        listElement.className += "col s12 m2 imagepreview"

        var card = document.createElement('div');
        card.className += "card"
        listElement.appendChild(card);

        var cardimage = document.createElement('div');
        cardimage.className += "card-image"
        card.appendChild(cardimage)

        var imgElement = document.createElement('img');
        imgElement.src = this.result;

        cardimage.appendChild(imgElement);


        var cardcontent = document.createElement('div');
        cardcontent.className += "card-content"
        card.appendChild(cardcontent)

        prev.insertBefore(listElement, document.querySelector('.imagepreview:first-child'));

        upload(file, cardcontent);

    });
    reader.readAsDataURL(file);

}
function upload(file, listitem)
{

    var barblock = document.createElement('div');
    barblock.className = "progress";
    var progressbar = document.createElement('div');
    barblock.appendChild(progressbar);
    progressbar.className += " determinate";
    progressbar.style.width = "70%";
    listitem.appendChild(barblock);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php'); // Rappelons qu'il est obligatoire d'utiliser la méthode POST quand on souhaite utiliser un FormData
    xhr.addEventListener('load', function(e) {
        barblock.remove();
        var span = document.createElement('span');
        span.innerHTML = e.target.response;
        listitem.appendChild(span);

    });
    xhr.upload.addEventListener('progress', function(e) {
        progressbar.style.width = (e.loaded/e.total*100) + "%";
    });
    var form = new FormData();
    form.append('file', file);
    xhr.send(form);
}