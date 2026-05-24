<?php
/**
 * 施工事例カスタム投稿タイプ & タクソノミー設定
 *
 * 追加方法（いずれか）:
 *   A. WordPress 管理画面 > Code Snippets プラグイン > 新規追加 → このコードを貼り付け
 *   B. wp-content/themes/（テーマ名）/functions.php の末尾にそのまま貼り付け
 *
 * ※ Code Snippets プラグインを使うと、テーマ更新時にコードが消えないので推奨です。
 */

// ============================================================
// 1. カスタム投稿タイプ「施工事例 (works)」を登録
// ============================================================
function takehara_register_works_cpt() {
    register_post_type( 'works', array(
        'labels' => array(
            'name'               => '施工事例',
            'singular_name'      => '施工事例',
            'add_new'            => '新規追加',
            'add_new_item'       => '施工事例を追加',
            'edit_item'          => '施工事例を編集',
            'new_item'           => '新規施工事例',
            'view_item'          => '施工事例を表示',
            'search_items'       => '施工事例を検索',
            'not_found'          => '施工事例が見つかりません',
            'not_found_in_trash' => 'ゴミ箱に施工事例はありません',
            'all_items'          => '施工事例一覧',
            'menu_name'          => '施工事例',
        ),
        'public'             => true,
        'has_archive'        => false,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'show_in_rest'       => true,   // ← REST API で取得するために必須
        'rest_base'          => 'works',
        'menu_icon'          => 'dashicons-hammer',
        'menu_position'      => 5,
        'rewrite'            => array( 'slug' => 'works', 'with_front' => false ),
    ) );
}
add_action( 'init', 'takehara_register_works_cpt' );


// ============================================================
// 2. タクソノミー「施工事例カテゴリー (works_category)」を登録
// ============================================================
function takehara_register_works_category() {
    register_taxonomy( 'works_category', 'works', array(
        'labels' => array(
            'name'              => '施工事例カテゴリー',
            'singular_name'     => '施工事例カテゴリー',
            'add_new_item'      => 'カテゴリーを追加',
            'edit_item'         => 'カテゴリーを編集',
            'search_items'      => 'カテゴリーを検索',
            'all_items'         => 'すべてのカテゴリー',
            'parent_item'       => '親カテゴリー',
            'not_found'         => 'カテゴリーが見つかりません',
            'menu_name'         => '施工事例カテゴリー',
        ),
        'public'            => true,
        'hierarchical'      => true,    // カテゴリー形式（チェックボックス）
        'show_in_rest'      => true,    // ← REST API で取得するために必須
        'rest_base'         => 'works_category',
        'show_admin_column' => true,    // 一覧画面でカテゴリーを列表示
        'rewrite'           => array( 'slug' => 'works-category' ),
    ) );
}
add_action( 'init', 'takehara_register_works_category' );


// ============================================================
// 3. カスタムメタフィールド (施工地域・施工内容) を REST API に公開
// ============================================================
function takehara_register_works_meta() {
    $args = array(
        'show_in_rest'      => true,
        'single'            => true,
        'type'              => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback'     => function() {
            return current_user_can( 'edit_posts' );
        },
    );
    register_post_meta( 'works', 'location', $args );  // 施工地域
    register_post_meta( 'works', 'service',  $args );  // 施工内容
}
add_action( 'init', 'takehara_register_works_meta' );


// ============================================================
// 4. 管理画面に「施工詳細」入力欄（メタボックス）を追加
//    施工地域・施工内容を入力できるシンプルなフォーム
// ============================================================
function takehara_add_works_meta_box() {
    add_meta_box(
        'takehara_works_details',
        '施工詳細（サイトへの表示内容）',
        'takehara_works_meta_box_html',
        'works',
        'side',      // サイドバーに表示
        'default'
    );
}
add_action( 'add_meta_boxes', 'takehara_add_works_meta_box' );

function takehara_works_meta_box_html( $post ) {
    wp_nonce_field( 'takehara_works_meta_save', 'takehara_works_nonce' );
    $location = get_post_meta( $post->ID, 'location', true );
    $service  = get_post_meta( $post->ID, 'service',  true );
    ?>
    <p style="margin-bottom:4px;">
        <label for="works_location" style="font-weight:bold;">施工地域</label>
    </p>
    <input
        type="text"
        id="works_location"
        name="works_location"
        value="<?php echo esc_attr( $location ); ?>"
        placeholder="例：鹿児島市郡元"
        style="width:100%;margin-bottom:12px;"
    />

    <p style="margin-bottom:4px;">
        <label for="works_service" style="font-weight:bold;">施工内容</label>
    </p>
    <input
        type="text"
        id="works_service"
        name="works_service"
        value="<?php echo esc_attr( $service ); ?>"
        placeholder="例：畳の表替え（国産い草）"
        style="width:100%;"
    />
    <p style="margin-top:8px;color:#999;font-size:11px;">
        ※ サイトの施工詳細カードに表示されます
    </p>
    <?php
}

function takehara_save_works_meta( $post_id ) {
    // セキュリティチェック
    if ( ! isset( $_POST['takehara_works_nonce'] ) ) return;
    if ( ! wp_verify_nonce( $_POST['takehara_works_nonce'], 'takehara_works_meta_save' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    if ( isset( $_POST['works_location'] ) ) {
        update_post_meta( $post_id, 'location', sanitize_text_field( $_POST['works_location'] ) );
    }
    if ( isset( $_POST['works_service'] ) ) {
        update_post_meta( $post_id, 'service', sanitize_text_field( $_POST['works_service'] ) );
    }
}
add_action( 'save_post_works', 'takehara_save_works_meta' );


// ============================================================
// 5. REST API で meta フィールドが確実に返るよう設定
//    （WordPress のバージョンによっては register_post_meta だけでは
//      _embed には含まれないことがあるため、明示的に追加）
// ============================================================
function takehara_works_rest_meta( $data, $post, $request ) {
    $data->data['meta'] = array(
        'location' => get_post_meta( $post->ID, 'location', true ) ?: '',
        'service'  => get_post_meta( $post->ID, 'service',  true ) ?: '',
    );
    return $data;
}
add_filter( 'rest_prepare_works', 'takehara_works_rest_meta', 10, 3 );
