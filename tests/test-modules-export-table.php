<?php

class Modules_Export_TableTest extends \WP_UnitTestCase {

	/**
	 * @var \Pressbooks\Modules\Export\Table
	 * @group export
	 */
	protected $table;

	/**
	 * @var array
	 * @group export
	 */
	protected $item = [
		'ID' => '43761d21',
		'file' => 'Test-1547581888.pdf',
		'format' => 'Pdf',
		'size' => 999999,
		'pin' => 0,
		'exported' => '2019-01-15 19:51',
	];

	/**
	 * @group export
	 */
	public function set_up() {
		parent::set_up();
		$GLOBALS['hook_suffix'] = 'mock';
		$_REQUEST['page'] = 'pb_export';
		$this->table = new \Pressbooks\Modules\Export\Table();
	}

	/**
	 * @group export
	 */
	public function test_single_row() {
		ob_start();
		$this->table->single_row( $this->item );
		$buffer = ob_get_clean();
		$this->assertStringContainsString( "<tr data-id='43761d21'", $buffer );
	}

	/**
	 * @group export
	 */
	public function test_column_default() {
		$x = $this->table->column_default( $this->item, 'ID' );
		$this->assertEquals( '43761d21', $x );
	}

	/**
	 * @group export
	 */
	public function test_column_file() {
		$x = $this->table->column_file( $this->item );
		$this->assertStringContainsString( "<div class='export-file-icon large pdf'", $x );
		$this->assertStringContainsString( "Test-1547581888.pdf", $x );
	}

	/**
	 * @group export
	 */
	public function test_column_pin() {
		$x = $this->table->column_pin( $this->item );
		$this->assertStringContainsString( "name='pin[43761d21]'", $x );
	}

	/**
	 * @group export
	 */
	public function test_get_columns() {
		$x = $this->table->get_columns();
		$this->assertArrayHasKey( 'cb', $x );
		$this->assertArrayHasKey( 'file', $x );
		$this->assertArrayHasKey( 'format', $x );
		$this->assertArrayHasKey( 'size', $x );
		$this->assertArrayHasKey( 'pin', $x );
		$this->assertArrayHasKey( 'exported', $x );
		$this->assertEquals( 'Date Exported', $x['exported'] );
	}

	/**
	 * @group export
	 */
	public function test_get_sortable_columns() {
		$x = $this->table->get_sortable_columns();
		$this->assertArrayHasKey( 'file', $x );
		$this->assertArrayHasKey( 'format', $x );
		$this->assertArrayHasKey( 'pin', $x );
		$this->assertArrayHasKey( 'exported', $x );
	}

	/**
	 * @group export
	 */
	public function test_get_bulk_actions() {
		$x = $this->table->get_bulk_actions();
		$this->assertArrayHasKey( 'delete', $x );
	}

	/**
	 * @group export
	 */
	public function test_prepare_items() {
		$this->table->prepare_items();
		$this->assertTrue( is_array( $this->table->items ) );
	}

	/**
	 * @group export
	 */
	public function test_inlineJs() {
		$x = $this->table->inlineJs();
		$this->assertStringContainsString( "var _pb_export_formats_map = ", $x );
		$this->assertStringContainsString( "var _pb_export_pins_inventory =", $x );
	}
}
