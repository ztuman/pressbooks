<?php
/**
 * File description
 *
 * @tags
 * See templating function for reference: \Pressbooks\Modules\Export\Export loadTemplate()
 */
// TODO: Review escaping in the next refactor
// @phpcs:disable Pressbooks.Security.EscapeOutput.OutputNotEscaped

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use function \Pressbooks\Sanitize\sanitize_xml_attribute;
use function \Pressbooks\Utility\explode_remove_and;
use HumanNameParser\Exception\NameParsingException;
use HumanNameParser\Parser;

echo '<?xml version="1.0" encoding="UTF-8" ?>' . "\n";
?>
<package version="3.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="pub-identifier">

	<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
		<?php
		// Required, Title
		echo '<dc:title id="pub-title">' . ( ! empty( $meta['pb_title'] ) ? $meta['pb_title'] : get_bloginfo( 'name' ) ) . '</dc:title>';
		unset( $meta['pb_title'] );
		echo "\n";

		// Required, Language
		echo '<dc:language id="pub-language">' . $lang . '</dc:language>';
		unset( $meta['pb_language'] );
		echo "\n";

		// Required, Modification date
		echo '<meta property="dcterms:modified">' . ( date( 'Y-m-d\TH:i:s\Z' ) ) . '</meta>';
		echo "\n";

		// Required, Primary I
		if ( ! empty( $meta['pb_ebook_isbn'] ) ) {
			echo '<dc:identifier id="pub-identifier">' . trim( $meta['pb_ebook_isbn'] ) . '</dc:identifier>';
            unset( $meta['pb_ebook_isbn'] );
		}
        elseif ( ! empty( $meta['pb_book_doi'] ) ) {
            echo '<dc:identifier id="pub-identifier">' . trim( $meta['pb_book_doi'] ) . '</dc:identifier>';
            unset( $meta['pb_book_doi'] );
        }
        else {
            echo '<dc:identifier id="pub-identifier">' . trim(get_bloginfo('url')) . '</dc:identifier>';
        }
        echo "\n";

		// Pick best non-html description
		if ( ! empty( $meta['pb_about_50'] ) ) {
			echo "<dc:description>{$meta['pb_about_50']}</dc:description>\n";
			unset( $meta['pb_about_50'] );
		} elseif ( ! empty( $meta['pb_about_140'] ) ) {
			echo "<dc:description>{$meta['pb_about_140']}</dc:description>\n";
			unset( $meta['pb_about_140'] );
		}


        // Add creators in the following order: Editors, Authors, Translators, Illustrators
		$index = 1;
		if ( ! \Pressbooks\Utility\empty_space( $meta['pb_editors'] ) ) {
//			echo \Pressbooks\Modules\Export\get_epub_contributor_meta( $meta['pb_editors'], $index, 'edt' );
			            $editors = explode_remove_and(';', $meta['pb_editors']);
			            foreach ( $editors as $editor ) {
			                $contributor_number = $index;
			                if ( $index < 10 ) {
			                    $contributor_number = str_pad( $index, 2, '0', STR_PAD_LEFT );
			                }
			                echo "<dc:creator id='creator{$contributor_number}'>{$editor}</dc:creator>\n";
			                echo "<meta refines='#creator{$contributor_number}' property='role' scheme='marc:relators' id='role{$contributor_number}'>edt</meta>\n";
			                // TODO: add file-as if possible
			                // echo "<meta refines='#creator{$contributor_number}' property='file-as'>last name, first name</meta>";
			                $index++;
			            }
		}
		if ( ! \Pressbooks\Utility\empty_space( $meta['pb_authors'] ) ) {
//			echo \Pressbooks\Modules\Export\get_epub_contributor_meta( $meta['pb_authors'], $index, 'aut' );
			            $authors = explode_remove_and(';', $meta['pb_authors']);
			            foreach ( $authors as $author ) {
			                $contributor_number = $index;
			                if ( $index < 10 ) {
			                    $contributor_number = str_pad( $index, 2, '0', STR_PAD_LEFT );
			                }
			                echo "<dc:creator id='creator{$contributor_number}'>{$author}</dc:creator>\n";
			                echo "<meta refines='#creator{$contributor_number}' property='role' scheme='marc:relators' id='role{$contributor_number}'>aut</meta>\n";
			                // TODO: add file-as if possible
			                // echo "<meta refines='#creator{$contributor_number}' property='file-as'>last name, first name</meta>";
			                $index++;
			            }
		}
		if ( ! \Pressbooks\Utility\empty_space( $meta['pb_translators'] ) ) {
//			echo \Pressbooks\Modules\Export\get_epub_contributor_meta( $meta['pb_translators'], $index, 'trl' );
			            $translators = explode_remove_and( ';', $meta['pb_translators'] );
			            foreach ( $translators as $translator ) {
			                $contributor_number = $index;
			                if ( $index < 10 ) {
			                    $contributor_number = str_pad( $index, 2, '0', STR_PAD_LEFT );
			                }
			                echo "<dc:creator id='creator{$contributor_number}'>{$translator}</dc:creator>\n";
			                echo "<meta refines='#creator{$contributor_number}' property='role' scheme='marc:relators' id='role{$contributor_number}'>trl</meta>\n";
			                $index++;
			            }
		}
		if ( ! \Pressbooks\Utility\empty_space( $meta['pb_illustrators'] ) ) {
//			echo \Pressbooks\Modules\Export\get_epub_contributor_meta( $meta['pb_illustrators'], $index, 'ill' );
			            $illustrators = explode_remove_and( ';', $meta['pb_illustrators'] );
			            foreach( $illustrators as $illustrator ) {
			                $contributor_number = $index;
			                if( $index < 10 ) {
			                    $contributor_number = str_pad( $index, 2, '0', STR_PAD_LEFT );
			                }
			                echo "<dc:creator id='creator{$contributor_number}'>{$illustrator}</dc:creator>\n";
			                echo "<meta refines='#creator{$contributor_number}' property='role' scheme='marc:relators' id='role{$contributor_number}'>ill</meta>\n";
			                $index++;
			            }
		}
		if ( $index === 1 ) {
			echo '<dc:creator id="creator">Pressbooks</dc:creator>';
		}

		// Add contributors
        $index = 1;
		if ( ! \Pressbooks\Utility\empty_space( $meta['pb_contributors'] ) ) {
			$contributors = explode_remove_and( ';', $meta['pb_contributors'] );
			foreach ( $contributors as $contributor ) {
                $contributor_number = $index;
                if ($index < 10) {
                    $contributor_number = str_pad($index, 2, '0', STR_PAD_LEFT);
                }
                echo "<dc:contributor id='contributor{$contributor_number}'>{$contributor}</dc:contributor>\n";
                echo "<meta refines='#contributor{$contributor_number}' property='role' scheme='marc:relators'>ctb</meta>\n";
                $index++;
            }
			unset( $meta['pb_contributors'] );
		}

		// Copyright
		if ( ! empty( $meta['pb_copyright_year'] ) || ! empty( $meta['pb_copyright_holder'] ) ) {
			echo '<dc:rights>';
			echo sanitize_xml_attribute( __( 'Copyright', 'pressbooks' ) ) . ' &#169; ';
			if ( ! empty( $meta['pb_copyright_year'] ) ) {
				echo $meta['pb_copyright_year'];
			} elseif ( ! empty( $meta['pb_publication_date'] ) ) {
				echo strftime( '%Y', $meta['pb_publication_date'] );
			} else {
				echo date( 'Y' );
			}
			if ( ! empty( $meta['pb_copyright_holder'] ) ) {
				echo ' ' . sanitize_xml_attribute( __( 'by', 'pressbooks' ) ) . ' ' . $meta['pb_copyright_holder'];
			}
			if ( ! empty( $do_copyright_license ) ) {
				echo '. ' . $do_copyright_license;
			}
			echo "</dc:rights>\n";
		}
		unset( $meta['pb_copyright_year'], $meta['pb_copyright_holder'] );
		unset( $do_copyright_license );

		// Rest of metadata
		foreach ( $meta as $key => $val ) {
			switch ( $key ) {

				case 'pb_publisher':
					echo "<dc:publisher>$val</dc:publisher>\n";
					break;

				case 'pb_publication_date':
					echo '<dc:date>';
					echo date( 'Y-m-d', (int) $val );
					echo "</dc:date>\n";
					break;

				case 'pb_bisac_subject':
					$subjects = explode( ',', $val );
					foreach ( $subjects as $subject ) {
						echo '<dc:subject>' . trim( $subject ) . "</dc:subject>\n";
					}
					break;

				default:
					// TODO: There should be default behaviour? E.g. echo "<!-- $key, $val -->\n";
					break;
			}
        }
	?>
        <!-- TODO: figure out way to add visual, auditory access mode details if book content includes images/audio -->
        <meta property="schema:accessMode">textual</meta>
        <meta property="schema:accessModeSufficient">textual</meta>
        <meta property="schema:accessibilityFeature">alternativeText</meta>
        <meta property="schema:accessibilityHazard">noFlashingHazard</meta>
        <meta property="schema:accessibilityHazard">noMotionSimulationHazard</meta>
        <meta property="schema:accessibilityHazard">noSoundHazard</meta>
        <!-- TODO: Allow creators to add accessibility info/summary in book info and display it here -->
        <meta property="schema:accessibilitySummary">This publication attempts to meet WCAG 2.0 Level A.</meta>
    </metadata>

	<manifest>
		<?php
		echo $manifest_filelist;
		echo $manifest_assets;
		?>
		<item id="toc" properties="nav" href="toc.xhtml" media-type="application/xhtml+xml"/>
		<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
		<?php if ( ! empty( $stylesheet ) ) : ?>
		<item id="stylesheet" href="OEBPS/<?php echo $stylesheet; ?>"  media-type="text/css" />
		<?php endif; ?>
	</manifest>

	<spine toc="ncx">
		<?php
		foreach ( $manifest as $k => $v ) {
			$linear = 'yes';
			printf( '<itemref idref="%s" linear="%s" />', $k, $linear );
			echo "\n";
		}
		?>
	</spine>

</package>
