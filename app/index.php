<!DOCTYPE html>
<html lang="en-US">

<head>
  <meta charset="utf-8" />
  <title><?php wp_title('|'); ?></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap" rel="stylesheet">
  <?php wp_head(); ?>
</head>

<body>

<?php 
  $section = get_field('section');
  $label = $section['label'];
  $title = $section['title'];
  $subtitle = $section['subtitle'];
  $items = $section['items'];
?>

  <main>
    <div class="container">
      <div class="title-box">
        <?php if(!empty($label)): ?>
          <div class="label"><?php echo $label; ?></div>
        <?php endif; ?>
        <?php if(!empty($title)): ?>
          <h1><?php echo $title; ?></h1>
        <?php endif; ?>
        <?php if(!empty($subtitle)): ?>
          <h2><?php echo $subtitle; ?></h2>
        <?php endif; ?>
      </div>
      <?php if($items[0]): ?>
        <div class="items">
          <?php foreach($items as $item): ?>
            <?php 
              $large = $item['large'];
              $image = $item['image'];
              $label = $item['label'];
              $title = $item['title'];
              ?>
            <div class="item<?php if($large){echo ' large';} ?>">
              <?php echo wp_get_attachment_image($image, 'full'); ?>
              <span><?php echo $label; ?></span>
              <h3><?php echo $title; ?></h3>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </main>

  <?php wp_footer(); ?>
</body>

</html>