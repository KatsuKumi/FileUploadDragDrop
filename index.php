<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>File Upload </title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="css/demo.css" />
        <link rel="stylesheet" type="text/css" href="css/component.css" />

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
        <style>
            .imgthumb{
                height: 180px;
            }
            .dragging:after {
                content: 'Lacher vos fichiers pour les uploads !';
                white-space: pre-wrap;
                color: #d3394c;
                font-size: 1.25rem;
                font-weight: 700;
                text-overflow: ellipsis;
            }
            .dragging{
                border: dashed black 5px;
            }
            .card-content{
                overflow: auto;
            }
            .imagepreview{
                height : 400px;
            }
        </style>
        <script>(function(e,t,n){var r=e.querySelectorAll("html")[0];r.className=r.className.replace(/(^|\s)no-js(\s|$)/,"$1js$2")})(document,window,0);</script>
    </head>
<body>

    <div class="container-fluid">
        <div class="content">
            <div class="box dropper" id="box">

                <input type="hidden" name="MAX_FILE_SIZE" value="1000000" />
                <input type="file" name="file[]" id="file" class="inputfile inputfile-3" data-multiple-caption="{count} files selected" multiple />
                <label for="file" id="fileinputlabel" class="dropper">Cliquer ou glisser un/des fichier(s) pour les upload&hellip;</label>
            </div>

            <div id="listing">
                <div class="row" id="prev">
                <?php

                $it = new FilesystemIterator('img/');
                $files = array();
                foreach ($it as $fileinfo) {
                    $files[$fileinfo->getMTime()] = $fileinfo->getFilename();
                }
                ksort($files);
                $files = array_reverse($files);
                foreach ($files as $key=>$fileinfo) {?>
                        <div class="col s12 m2 imagepreview">
                            <div class="card">
                                <div class="card-image">
                                    <img src="img/<?php echo $fileinfo ?>">
                                </div>
                                <div class="card-content">
                                    <p><?php echo $fileinfo ?></p>
                                </div>
                            </div>
                        </div>

                    <?php
                }
                ?>
                </div>
            </div>

        </div>
    </div><!-- /container -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="js/custom-file-input.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>

    <script src="js/script.js"></script>

	</body>


</html>
