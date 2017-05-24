<?php

if (!empty($_POST))
{
    unlink("img/".$_POST['img']);
}