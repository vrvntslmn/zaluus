import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Mail, Send } from 'lucide-react';
import BudgetSelector, { budgetOptions } from './BudgetSelector';
import { contactConfig } from '../config/contact';

type ContactFormProps = {
  budgetIndex: number;
  onBudgetChange: (value: number) => void;
};

export default function ContactForm({ budgetIndex, onBudgetChange }: ContactFormProps) {
  const [notice, setNotice] = useState('');
  const emailReady = contactConfig.email.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    if (!emailReady) {
      setNotice('Мэдээлэл илгээгдсэнгүй. Одоогоор имэйл эсвэл серверийн илгээх хаяг тохируулаагүй байна. Холбоо барих хаягийг тохируулмагц эндээс илгээх боломж нээгдэнэ.');
      return;
    }

    const values = new FormData(form);
    const subject = `Веб төслийн тухай — ${String(values.get('name') ?? '')}`;
    const body = [
      `Нэр: ${values.get('name') ?? ''}`,
      `Холбоо барих: ${values.get('contact') ?? ''}`,
      `Вебийн төрөл: ${values.get('siteType') ?? ''}`,
      `Төсөөлсөн төсөв: ${budgetOptions[budgetIndex]?.label ?? 'Ярилцаад шийдье'}`,
      '',
      `Төслийн тухай: ${values.get('project') ?? ''}`,
    ].join('\n');

    window.location.href = `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice('Төхөөрөмжийн имэйл апп нээгдэхийг хүсэлт болголоо. Имэйл илгээгдсэн гэж баталгаажихгүй — илгээх товчийг та өөрөө дарна уу.');
  }

  return (
    <div className="contact-form-wrap" id="contact-form">
      <div className="form-topline">
        <span className="micro-label">ТӨСЛИЙН ТОВЧ</span>
        <span className="form-required-note"><i>*</i> Заавал бөглөх талбар</span>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="field-row">
          <span>Таны нэр <i>*</i></span>
          <input name="name" type="text" autoComplete="name" placeholder="Нэрээ бичнэ үү" minLength={2} maxLength={80} required />
        </label>
        <label className="field-row">
          <span>Холбоо барих мэдээлэл <i>*</i></span>
          <input name="contact" type="text" autoComplete="off" placeholder="И-мэйл эсвэл утасны дугаар" minLength={6} maxLength={120} required />
        </label>
        <label className="field-row field-row--select">
          <span>Ямар төрлийн веб хэрэгтэй вэ? <i>*</i></span>
          <select name="siteType" defaultValue="" required>
            <option value="" disabled>Төрлөө сонгоно уу</option>
            <option>Байгууллага, бизнесийн веб сайт</option>
            <option>Сурталчилгааны лендинг хуудас</option>
            <option>Онлайн дэлгүүр</option>
            <option>Хувийн танилцуулга, портфолио</option>
            <option>Захиалгат веб шийдэл</option>
            <option>Одоогоор тодорхойгүй</option>
          </select>
        </label>
        <div className="field-row field-row--budget">
          <span>Ойролцоогоор ямар төсөв төлөвлөсөн бэ? <i>*</i></span>
          <BudgetSelector value={budgetIndex} onChange={onBudgetChange} compact />
        </div>
        <label className="field-row field-row--textarea">
          <span>Төслийнхөө талаар <i>*</i></span>
          <textarea name="project" placeholder="Ямар санааг бодит болгохыг хүсэж байна вэ?" minLength={12} maxLength={1200} rows={3} required />
        </label>
        <button className="submit-button" type="submit">
          <span>Төслөө ярилцах</span>
          <span className="submit-icon" aria-hidden="true"><Send size={16} /></span>
        </button>
        <p className="privacy-note"><Mail size={14} /> {emailReady ? `Илгээхэд ${contactConfig.email} хаягтай имэйл апп нээгдэнэ.` : 'Маягтын мэдээллийг одоогоор илгээх суваг тохируулаагүй; илгээхэд мэдээлэл тань хадгалагдахгүй.'}</p>
        {notice && (
          <div className="form-notice" role="status" aria-live="polite">
            <Check size={17} /> <span>{notice}</span>
          </div>
        )}
      </form>
      {emailReady && <a className="direct-email" href={`mailto:${contactConfig.email}`}>Шууд и-мэйл бичих <ArrowUpRight size={15} /></a>}
    </div>
  );
}
