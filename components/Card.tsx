interface Props {
  children: React.ReactNode;
}

export const Card = ({ children }: Props) => {
  return (
    <div className="max-w-xl w-full bg-slate-200 p-5 sm:p-10 rounded-md">
      {children}
    </div>
  );
};
