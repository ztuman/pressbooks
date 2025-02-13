<?php


class Shortcodes_Complex extends \WP_UnitTestCase {

	use utilsTrait;

	/**
	 * @var \Pressbooks\Shortcodes\Complex\Complex
	 * @group shortcodes
	 */
	protected $complex;

	/**
	 * @group shortcodes
	 */
	public function set_up() {
		parent::set_up();

		$this->complex = $this->getMockBuilder( '\Pressbooks\Shortcodes\Complex\Complex' )
			->setMethods( null ) // pass null to setMethods() to avoid mocking any method
			->disableOriginalConstructor() // disable private constructor
			->getMock();
	}

	/**
	 * @group shortcodes
	 */
	public function test_getInstance() {
		$val = $this->complex->init();

		$this->assertTrue( $val instanceof \Pressbooks\Shortcodes\Complex\Complex );

		global $shortcode_tags;
		$this->assertArrayHasKey( 'anchor', $shortcode_tags );
		$this->assertArrayHasKey( 'columns', $shortcode_tags );
		$this->assertArrayHasKey( 'email', $shortcode_tags );
		$this->assertArrayHasKey( 'equation', $shortcode_tags );
		$this->assertArrayHasKey( 'media', $shortcode_tags );
	}

	/**
	 * @group shortcodes
	 */
	public function test_anchorShortcodeHandler() {
		// Test an anchor with an ID.
		$content = $this->complex->anchorShortCodeHandler( [ 'id' => 'my-anchor' ], '', 'anchor' );
		$this->assertEquals( '<a id="my-anchor"></a>', $content );

		// Test an anchor with an invalid ID.
		$content = $this->complex->anchorShortCodeHandler( [ 'id' => 'This should not have spaces in it' ], '', 'anchor' );
		$this->assertEquals( '<a id="this-should-not-have-spaces-in-it"></a>', $content );

		// Test an anchor with an optional title.
		$content = $this->complex->anchorShortCodeHandler( [ 'id' => 'my-anchor-with-a-title' ], 'My anchor', 'anchor' );
		$this->assertEquals( '<a id="my-anchor-with-a-title" title="My anchor"></a>', $content );

		// Test an anchor with an optional class.
		$content = $this->complex->anchorShortCodeHandler( [ 'id' => 'my-anchor', 'class' => 'admiralty' ], '', 'anchor' );
		$this->assertEquals( '<a id="my-anchor" class="admiralty"></a>', $content );

		$this->assertEmpty( $this->complex->anchorShortCodeHandler( [], '', 'anchor' ) );
	}

	/**
	 * @group shortcodes
	 */
	public function test_columnsShortcodeHandler() {
		// Test a column with no attributes.
		$content = $this->complex->columnsShortCodeHandler( [], 'Call me Ishmael.', 'columns' );
		$this->assertEquals( '<div class="twocolumn"><p>Call me Ishmael.</p>
</div>', $content );

		// Test an column with a count parameter of 2.
		$content = $this->complex->columnsShortCodeHandler( [ 'count' => 2 ], 'Call me Ishmael.', 'columns' );
		$this->assertEquals( '<div class="twocolumn"><p>Call me Ishmael.</p>
</div>', $content );

		// Test an column with a count parameter of 3.
		$content = $this->complex->columnsShortCodeHandler( [ 'count' => 3 ], 'Call me Ishmael.', 'columns' );
		$this->assertEquals( '<div class="threecolumn"><p>Call me Ishmael.</p>
</div>', $content );

		// Test an column with an invalid count parameter.
		$content = $this->complex->columnsShortCodeHandler( [ 'count' => 'bad' ], 'Call me Ishmael.', 'columns' );
		$this->assertEquals( '<div class="twocolumn"><p>Call me Ishmael.</p>
</div>', $content );

		// Test a column with a class attribute.
		$content = $this->complex->columnsShortCodeHandler( [ 'class' => 'my-class' ], 'Call me Ishmael.', 'columns' );
		$this->assertEquals( '<div class="my-class twocolumn"><p>Call me Ishmael.</p>
</div>', $content );

		// Test a column with class and count attributes.
		$content = $this->complex->columnsShortCodeHandler( [ 'count' => 3, 'class' => 'my-class' ], 'Call me Ishmael.', 'columns' );
		$this->assertEquals( '<div class="my-class threecolumn"><p>Call me Ishmael.</p>
</div>', $content );

		$this->assertEmpty( $this->complex->columnsShortCodeHandler( [], '', 'columns' ) );
	}

	/**
	 * @group shortcodes
	 */
	public function test_emailShortcodeHandler() {
		// Test an email with no content.
		$content = $this->complex->emailShortCodeHandler( [ 'address' => 'me@here.com' ], '', 'email' );
		$this->assertEquals( '<a href="mailto:me@here.com">me@here.com</a>', wp_kses_decode_entities( $content ) );

		// Test an email with content.
		$content = $this->complex->emailShortCodeHandler( [ 'address' => 'me@here.com' ], 'my email', 'email' );
		$this->assertEquals( '<a href="mailto:me@here.com">my email</a>', wp_kses_decode_entities( $content ) );

		// Test an email with identical address and content.
		$content = $this->complex->emailShortCodeHandler( [ 'address' => 'me@here.com' ], 'me@here.com', 'email' );
		$this->assertEquals( '<a href="mailto:me@here.com">me@here.com</a>', wp_kses_decode_entities( $content ) );

		// Test an email with an optional class.
		$content = $this->complex->emailShortCodeHandler( [ 'address' => 'me@here.com', 'class' => 'envelope' ], '', 'email' );
		$this->assertEquals( '<a href="mailto:me@here.com" class="envelope">me@here.com</a>', wp_kses_decode_entities( $content ) );

		// Test an email with an invalid address and content.
		$this->assertEmpty( $this->complex->emailShortCodeHandler( [ 'address' => 'mehere.com' ], 'hi there', 'email' ) );

		// Test an email with an invalid content and no address.
		$this->assertEmpty( $this->complex->emailShortCodeHandler( [], 'hi there', 'email' ) );

		$this->assertEmpty( $this->complex->emailShortCodeHandler( [], '', 'email' ) );
	}

	/**
	 * @group shortcodes
	 */
	public function test_equationShortcodeHandler() {
		add_filter( 'pb_mathjax_use', '__return_true' );
		$content = $this->complex->equationShortCodeHandler( [], 'e^{\i \pi} + 1 = 0', 'equation' );
		$this->assertEquals( "<p><img src=\"http://localhost:3000/latex?latex=e%5E%7B%5Ci%20%5Cpi%7D%20%2B%201%20%3D%200&#038;fg=000000&#038;font=TeX\" alt=\"e^{&#92;i &#92;pi} + 1 = 0\" title=\"e^{&#92;i &#92;pi} + 1 = 0\" class=\"latex mathjax\" /></p>\n", $content );
	}

	/**
	 * @group shortcodes
	 */
	public function test_mediaShortcodeHandler() {
		// Test a YouTube embed as a src attribute
		$content = $this->complex->mediaShortCodeHandler( [ 'src' => 'https://www.youtube.com/watch?v=JgIhGTpKTwM' ], '', 'embed' );
		$this->assertStringContainsString( '<iframe', $content );

		// Test a YouTube embed as content
		$content = $this->complex->mediaShortCodeHandler( [], 'https://www.youtube.com/watch?v=JgIhGTpKTwM', 'embed' );
		$this->assertStringContainsString( '<iframe', $content );

		// Test a YouTube embed as a src attribute with a caption
		$content = $this->complex->mediaShortCodeHandler( [ 'caption' => 'Deploy day!', 'src' => 'https://www.youtube.com/watch?v=JgIhGTpKTwM' ], '', 'embed' );
		$this->assertStringContainsString( '<figure', $content );
		$this->assertStringContainsString( '<iframe', $content );
		$this->assertStringContainsString( '<figcaption>Deploy day!</figcaption>', $content );

		// Test a YouTube embed as content with a caption
		$content = $this->complex->mediaShortCodeHandler( [ 'caption' => 'Deploy day!' ], 'https://www.youtube.com/watch?v=JgIhGTpKTwM', 'embed' );
		$this->assertStringContainsString( '<figure', $content );
		$this->assertStringContainsString( '<iframe', $content );
		$this->assertStringContainsString( '<figcaption>Deploy day!</figcaption>', $content );
	}

}
