import {
    StyleSheet,
    Dimensions
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        backgroundColor: '#ffb643',
        padding: 20,
    },
    header_menu: {
        backgroundColor: '#4C4949',
        paddingVertical: 5,
        height: 60,
    },
    header_title: {
        color: '#fff',
    },
    logo: {
        width: 75,
        height: 75,
    },
    header_text: {
        flex: 1,
        color: '#363636',
        fontSize: 18,
        marginTop: 10,
    },
    header_text_big: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    header_text_small: {
        fontSize: 16,
        textAlign: 'center',
    },
    header_logo: {
      height: 40,
      marginLeft: 20,
      width: 60,
    },
    content_text: {
        color: '#363636',
        fontSize: 18,
    },
    content: {
        flex: 1.5,
        backgroundColor: '#ffb643',
        padding: 20,
        position: 'relative',
    },
    bg_excavators: {
        position: 'absolute',
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        bottom: 0,
        right: 0,
    },
    button_container: {
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1.5,
    },
    text_center: {
        alignSelf: 'center',
    },
    //
    margin_bottom_10: {
        marginBottom: 10,
    },
    // timeline
    feed_text: {
        color: '#363636',
        flexDirection: 'row',
    },
    feed_text_title: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    feed_text_content: {
        fontSize: 12,
    },
    feed_images: {
        width: 100,
        height: 75,
    },
    col_list: {

    },
    font_list: {
        fontSize: 12,
        color: '#363636',
    },
    content_body_font: {
        color: '#363636',
        fontSize: 14,
    },
    tab_dextra_logo: {
        width: 80,
        height: 60,
    },
    // Modal
    modal: {
        backgroundColor: '#fff',
        flex: 1,
    },
    // timeline detail
    content_body: {
        padding: 12,
    },
    content_body_heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 6,
    },
    content_body_heading_font: {
        fontSize: 20,
        color: '#363636',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    content_body_date_font: {
        fontSize: 12,
        color: '#363636',
        alignSelf: 'flex-end',
        paddingBottom: 2,
    },
    content_body_font: {
        color: '#363636',
        fontSize: 14,
    },
    content_header_italic: {
        fontSize: 12,
        color: '#363636',
        fontStyle: 'italic',
    },
    content_banner_image: {
        width: '100%',
        height: 180,
    },
    content_title: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#363636',
    },
    // Map
    map_container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    map_form: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    map_button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 100,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    no_data: {
        padding: 20,
        textAlign: 'center',
    },
    viewPager: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pageStyle: {
        padding: 0,
    },
})
