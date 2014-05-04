x-shared-assets
===============

An experiment on how to share public assets like header/footer, navigation, analytics etc.

## Todo

- Clean all folders related to current version (including 1.0.0, 1.0.x, 1.x)
- Add files to 1.0.x, 1.x, x
- local/dev/prod-miljø (grunt?)
- Client som inkluderer
- Deploy med push (Grunt?)
- Client som inkluderer basert på versjonsnummer (1.0.x, 1.x, master, dev-master)
- Filstruktur
- Add helper classes for PHP with Composer
- Add helper classes for Laravel projects
- Add example for

## Maybe someday

- Add version bumping with deployment: https://www.npmjs.org/package/grunt-push-release
- Add githook: https://gist.github.com/GianlucaGuarini/8001627

## Thoughts
PHP projects should include local versions of these templates when in dev, but
use the centralized ones in production. The same goes for js/front end projects.
How to handle this check. It's easier when using Laravel, but this must work
for old "incorrect" projects as well. In those projects we use:
include ("/www/dagbladet/www.dagbladet.no/inc3/template.html");
Maybe that's the answer. Just replace all includes of that type. Or we could do better;
add a helper class that does something like this:
include ("/www/dagbladet/www.dagbladet.no/templates/templateHelperClass.php");
$template = new TemplateHelper();
$template->render("template", $data, $version);
$version can be "1.0.1", "1.0.x", "1.x". It's "dev-master" if not specified.
