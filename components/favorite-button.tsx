import HeartSvg from "~/components/heart-svg";
import { cx } from "~/utils/cx";

interface Props
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  className?: string;
  favorited?: boolean;
}

export default function FavoriteButton({
  className,
  favorited,
  ...props
}: Props) {
  return (
    <button
      className={cx(
        "flex h-10 w-10 items-center justify-center border-2 border-black bg-transparent text-black hover:opacity-75",
        className
      )}
      title="Voeg toe aan favorieten"
      {...props}
    >
      <span className="sr-only">Voeg toe aan favorieten</span>
      <HeartSvg filled={favorited} />
    </button>
  );
}
