<?php $settings = get_option(SH_NAME);?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php echo ( sh_set( $settings, 'site_favicon' ) ) ? '<link rel="icon" type="image/png" href="'.sh_set( $settings, 'site_favicon' ).'">': '';?>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title> 
		<?php if(is_home() || is_front_page()) {
			 echo get_bloginfo('name');
		}
		else{
			 wp_title('');
		}?>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!--[if lt IE 9]>
    <link rel="stylesheet" type="text/css" href="css/ie.css" />
    <script type="text/javascript" language="javascript" src="js/html5shiv.js"></script>
    <![endif]-->
    
    <?php wp_head(); ?>
</head>
<?php $res_settings = sh_header_settings($settings);
$custom_sticky_header_class = (sh_set($settings , 'sh_custom_stickey_menu') == 'true') ? 'sticky' : '' ; 
?>
<body <?php body_class(sh_set( $res_settings, 'pattern') ); ?>  style=" <?php echo sh_set($res_settings, 'pattern_image'); ?>">
<div class="theme-layout <?php echo sh_set($res_settings, 'boxed'); ?>" style=" <?php echo sh_set($res_settings, 'width'); ?>">

    <header class="middle-logo <?php echo $custom_sticky_header_class; ?>">
        <div class="container">
            <div class="logo"> 
                <?php
                if( isset( $settings['logo_text_status'] ) && $settings['logo_text_status'] === 'true' )
                {
                    $LogoStyle = sh_get_font_settings( array( 'logo_text_font_size' => 'font-size', 'logo_text_font_family' => 'font-family', 'logo_text_font_style' => 'font-style', 'logo_text_color' => 'color' ), ' style="', '"' );
                    $Logo = $settings['logo_text'];
                }
                else
                {
                    $LogoStyle = '';
                    $LogoImageStyle = ( sh_set( $settings, 'logo_width' ) || sh_set( $settings, 'logo_height' ) ) ? ' style="': '';
                    $LogoImageStyle .= ( sh_set( $settings, 'logo_width' ) ) ? ' width:'.sh_set( $settings, 'logo_width' ).'px;': '';
                    $LogoImageStyle .= ( sh_set( $settings, 'logo_height' ) ) ? ' height:'.sh_set( $settings, 'logo_height' ).'px;': '';
                    $LogoImageStyle .= ( sh_set( $settings, 'logo_width' ) || sh_set( $settings, 'logo_height' ) ) ? '"': '';
                    $Logo = '<img src="'.$settings['logo_image'].'" alt=""'.$LogoImageStyle.' />';
                }
                ?>
                <a href="<?php echo home_url(); ?>" title="<?php bloginfo('name'); ?>"<?php echo $LogoStyle;?>>
                <?php if( sh_set($settings, 'logo_text_status') === 'true' ) ?> <h1 <?php echo $LogoStyle;?>>
				<?php echo $Logo;?>
                 <?php if( sh_set($settings, 'logo_text_status') === 'true' ) ?> </h1>
                </a>
                <?php
                if( sh_set( $settings, 'logo_text_status' ) === 'true' && sh_set( $settings, 'site_salogan' ) )
                {
                    $SaloganStyle = sh_get_font_settings( array( 'salogan_font_size' => 'font-size', 'salogan_font_family' => 'font-family', 'salogan_font_style' => 'font-style' ), ' style="', '"' );
                    echo '<p'.$SaloganStyle.'>'.$settings['site_salogan'].'</p>';
                }
                ?>
            </div>
            <!-- Logo -->
            <nav class="menu">
				<?php wp_nav_menu( array( 'theme_location' => '', 'menu_id' => 'menu-navigation' ) ); ?>
            </nav>
            <!-- Menu -->
            <?php
            $MenuList = '<option value="">Menu</option>';
            $MenuName = 'main_menu';
            
            if ( ( $Locations = get_nav_menu_locations() ) && isset( $Locations[ $MenuName ] ) ) 
            {
                $Menu = wp_get_nav_menu_object( $Locations[ $MenuName ] );
                
                $MenuItems = wp_get_nav_menu_items( $Menu->term_id );
                
                foreach ( (array) $MenuItems as $key => $MenuItem ) 
                {
                    $MenuTitle = $MenuItem->title;
                    $MenuURL = $MenuItem->url;
                    $MenuList .= '<option value="'.$MenuURL.'">'.$MenuTitle.'</option>';
                }
             }
             ?>
             <select class="ipadMenu">
               <?php echo $MenuList;?>
             </select>
        </div>
    </header>