<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><?php echo $webpage->getTitle(); ?></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous" />
        <?php foreach($webpage->getCss() as $cssFile): ?>
            <link rel="stylesheet" href="<?php echo "css/" . $cssFile; ?>">
        <?php endforeach; ?>
    </head>
    <body>
        <nav class="p-0 navbar navbar-light bg-light"></nav>
        <main class="pb-4"></main>
        <footer class="ms-0 mt-4 me-0 p-4 align-middle border-top border-light"></footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
        <?php foreach($webpage->getJs() as $jsScript): ?>
            <script src="<?php echo $jsScript; ?>"></script>
        <?php endforeach; ?>
    </body>
</html>