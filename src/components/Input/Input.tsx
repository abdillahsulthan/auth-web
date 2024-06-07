interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  onChange: any;
}

const Input = ({ id, type, placeholder, onChange }: InputProps) => {
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
