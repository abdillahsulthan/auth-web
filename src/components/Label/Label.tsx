interface LabelProps {
    htmlFor: string;
    text: string;
  }
  
  const Label = ({ htmlFor, text }: LabelProps) => {
    return (
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={htmlFor}>
            {text}
        </label>
    );
  };
  
  export default Label;
  