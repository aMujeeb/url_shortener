export default function directToPage(navigateUrl: String) {
    window.open(navigateUrl.toString().trim(), '_blank');
}