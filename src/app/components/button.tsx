interface ButtonProps {
    callBackValue: String,
    loading: boolean,
    onButtonClick: (shortUrl: String) => void,
    children: React.ReactNode
}

export default function Button({ callBackValue, loading, onButtonClick, children }: ButtonProps) {

    const openLinkClickHandler = () => {
        onButtonClick(callBackValue);
    };

    return (
        <button className="shorten-button" onClick={openLinkClickHandler} disabled={loading}>
            {loading ? <i className="fa fa-spinner fa-spin"></i> : children}
        </button>
    )

}