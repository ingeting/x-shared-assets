<?php

  class TemplateHelper {

    private $engine;

    public function __construct($version = "dev-master") {
      $this->engine = new Mustache_Engine(array(
          'cache' => dirname(__FILE__).'/tmp/cache/mustache',
          'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'../_dist/'.$version),
      ));


    }

    public function render($template, $data = array(), $version = "dev-master") {
        $template = $this->engine->loadTemplate(template);
        echo $tpl->render(data);
    }
  }

?>
