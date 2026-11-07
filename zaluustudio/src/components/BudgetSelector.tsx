import { ArrowDownRight, MoveUpRight } from 'lucide-react';

export const budgetOptions = [
  {
    label: 'Эхний алхмаа ярилцах',
    short: 'Эхлэл',
    body: 'Эхлээд зайлшгүй хэрэгтэй зүйлсээ ялгая. Боломжтой хамгийн энгийн хүрээнээс эхэлж, дараагийн шатыг хамт төлөвлөж болно.',
  },
  {
    label: 'Хязгаарлагдмал төсөв',
    short: 'Тодорхой хүрээ',
    body: 'Гол зорилгодоо төвлөрч, хамгийн чухал хуудсууд болон боломжуудыг эхэлж эрэмбэлье. Шаардлагагүй зардлаас зайлсхийхэд тусална.',
  },
  {
    label: 'Дунд хэмжээний төсөв',
    short: 'Тэнцвэртэй',
    body: 'Хэрэгцээ, агуулга, нэмэлт боломжуудын хооронд тэнцвэр олох хүрээ. Яг юу багтахыг төслийн цар хүрээг ярилцаж байж тодруулна.',
  },
  {
    label: 'Уян хатан боломж',
    short: 'Өргөжүүлэх',
    body: 'Илүү олон хуудас, холболт, эсвэл тусгай шийдлийг үе шаттай ярилцах боломжтой. Эцсийн санал хэрэгцээ, ажлын хүрээнээс шалтгаална.',
  },
  {
    label: 'Одоогоор тодорхойгүй',
    short: 'Хамтдаа олъё',
    body: 'Төсөв тодорхойгүй байж болно. Санаа, зорилго, хугацаагаа ярилцаад тохирох хүрээг хамтдаа тогтооно.',
  },
] as const;

type BudgetSelectorProps = {
  value: number;
  onChange: (value: number) => void;
  compact?: boolean;
};

export default function BudgetSelector({ value, onChange, compact = false }: BudgetSelectorProps) {
  const selected = budgetOptions[value] ?? budgetOptions[0];

  return (
    <div className={`budget-selector${compact ? ' budget-selector--compact' : ''}`}>
      <div className="budget-range-head">
        <span className="micro-label">ТАНЫ ОДООГИЙН ТӨСӨӨЛӨЛ</span>
        <span className="budget-range-count">0{value + 1} <i>/ 05</i></span>
      </div>
      <div className="budget-choice-list" role="group" aria-label="Төсвийн ойролцоо боломж">
        {budgetOptions.map((option, index) => (
          <button
            className={`budget-choice${value === index ? ' is-selected' : ''}`}
            key={option.short}
            type="button"
            aria-pressed={value === index}
            onClick={() => onChange(index)}
          >
            <span className="budget-choice-number">0{index + 1}</span>
            <span>{option.label}</span>
            <span className="budget-choice-arrow" aria-hidden="true">{value === index ? '↗' : '+'}</span>
          </button>
        ))}
      </div>
      <div className="budget-guidance" aria-live="polite" aria-atomic="true">
        <span className="guidance-icon" aria-hidden="true">✳</span>
        <div>
          <strong>{selected.short} хүрээнд</strong>
          <p>{selected.body}</p>
        </div>
      </div>
      {!compact && (
        <p className="budget-disclaimer"><ArrowDownRight size={15} /> Эцсийн үнийн санал нь хэрэгцээ, ажлын хүрээг ярилцсаны дараа гарна.</p>
      )}
      {compact && <span className="budget-next-hint"><MoveUpRight size={13} /> Хүрээг хамтдаа сонгоё</span>}
    </div>
  );
}
