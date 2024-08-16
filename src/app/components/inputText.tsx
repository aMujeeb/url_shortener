interface InputTextProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    disabled: boolean
}

export default function InputText({ value, onChange, placeholder, disabled }: InputTextProps) {

    return (
        <div>
            <input
                type="text"
                className="url-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}