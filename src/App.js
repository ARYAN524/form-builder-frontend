import { useState } from "react";

// ─── Styles ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0d0d0d;
    color: #f0ede8;
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
  }

  .app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    min-height: 100vh;
  }

  /* ── LEFT PANEL: Builder ─────────────────────────────── */
  .builder {
    background: #111;
    border-right: 1px solid #222;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
  }

  .panel-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: #555;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .panel-title {
    font-size: 1.7rem;
    font-weight: 800;
    line-height: 1.1;
    background: linear-gradient(135deg, #f0ede8 40%, #888 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .form-name-input {
    width: 100%;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #f0ede8;
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-name-input:focus { border-color: #e8c547; }
  .form-name-input::placeholder { color: #444; }

  /* ── Field card ──────────────────────────────────────── */
  .field-card {
    background: #171717;
    border: 1px solid #252525;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
    animation: slideIn 0.25s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .field-row {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .field-index {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    color: #444;
    min-width: 1.5rem;
  }

  .field-input, .field-select {
    flex: 1;
    background: #1e1e1e;
    border: 1px solid #2e2e2e;
    border-radius: 6px;
    padding: 0.55rem 0.85rem;
    color: #f0ede8;
    font-family: 'DM Mono', monospace;
    font-size: 0.82rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .field-input:focus, .field-select:focus { border-color: #e8c547; }
  .field-select option { background: #1e1e1e; }

  .field-required {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    color: #666;
    cursor: pointer;
    white-space: nowrap;
  }
  .field-required input[type="checkbox"] { accent-color: #e8c547; cursor: pointer; }

  .delete-btn {
    background: none;
    border: none;
    color: #444;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    transition: color 0.2s, background 0.2s;
  }
  .delete-btn:hover { color: #e05252; background: #2a1515; }

  .options-hint {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    color: #555;
    padding-left: 2rem;
  }
  .options-input {
    background: #1e1e1e;
    border: 1px solid #2e2e2e;
    border-radius: 6px;
    padding: 0.55rem 0.85rem;
    color: #f0ede8;
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    outline: none;
    width: 100%;
    transition: border-color 0.2s;
  }
  .options-input:focus { border-color: #e8c547; }

  /* ── Buttons ─────────────────────────────────────────── */
  .btn-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }

  .btn {
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 0.82rem;
    padding: 0.65rem 1.25rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.03em;
  }

  .btn-add {
    background: #1e1e1e;
    color: #e8c547;
    border: 1px solid #333;
  }
  .btn-add:hover { background: #252510; border-color: #e8c547; }

  .btn-save {
    background: #e8c547;
    color: #0d0d0d;
    margin-left: auto;
  }
  .btn-save:hover { background: #f5d55a; transform: translateY(-1px); }
  .btn-save:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  .toast {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: #1a2a1a;
    border: 1px solid #2a4a2a;
    color: #6dcc6d;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #333;
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    border: 1px dashed #222;
    border-radius: 10px;
  }

  /* ── RIGHT PANEL: Live Preview ───────────────────────── */
  .preview {
    background: #0d0d0d;
    padding: 2.5rem;
    overflow-y: auto;
  }

  .preview-card {
    background: #111;
    border: 1px solid #222;
    border-radius: 14px;
    padding: 2rem;
    max-width: 480px;
  }

  .preview-title {
    font-size: 1.3rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }

  .preview-subtitle {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    color: #555;
    margin-bottom: 1.75rem;
    letter-spacing: 0.1em;
  }

  .preview-field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem; }

  .preview-label {
    font-size: 0.82rem;
    font-weight: 600;
    color: #ccc;
    display: flex;
    gap: 0.3rem;
  }
  .required-star { color: #e8c547; }

  .preview-input, .preview-select, .preview-textarea {
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 7px;
    padding: 0.65rem 0.9rem;
    color: #f0ede8;
    font-family: 'DM Mono', monospace;
    font-size: 0.83rem;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .preview-input:focus, .preview-select:focus, .preview-textarea:focus {
    border-color: #e8c547;
  }
  .preview-textarea { resize: vertical; min-height: 80px; }
  .preview-select option { background: #1a1a1a; }

  .preview-radio-group, .preview-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .preview-radio-label, .preview-checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: #aaa;
    cursor: pointer;
  }
  input[type="radio"], input[type="checkbox"] { accent-color: #e8c547; }

  .btn-submit {
    width: 100%;
    background: #e8c547;
    color: #0d0d0d;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: all 0.2s;
    letter-spacing: 0.05em;
  }
  .btn-submit:hover { background: #f5d55a; transform: translateY(-1px); }

  .submitted-box {
    background: #1a2a1a;
    border: 1px solid #2a4a2a;
    border-radius: 10px;
    padding: 1.5rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    color: #6dcc6d;
    white-space: pre-wrap;
    word-break: break-all;
    margin-top: 1rem;
  }

  .schema-box {
    margin-top: 1.5rem;
    background: #0a0a0a;
    border: 1px solid #1e1e1e;
    border-radius: 10px;
    padding: 1.25rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    color: #555;
    white-space: pre-wrap;
    word-break: break-all;
  }

  @media (max-width: 768px) {
    .app { grid-template-columns: 1fr; }
    .builder { border-right: none; border-bottom: 1px solid #222; }
  }
`;

// ─── Constants ───────────────────────────────────────────────────────────────
const FIELD_TYPES = [
  { value: "text",     label: "Text" },
  { value: "email",    label: "Email" },
  { value: "number",   label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select",   label: "Dropdown" },
  { value: "radio",    label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
  { value: "date",     label: "Date" },
];

let _id = 0;
const uid = () => ++_id;

const blankField = () => ({
  id: uid(),
  type: "text",
  label: "",
  placeholder: "",
  required: false,
  options: "",
});

// ─── FieldCard Component ─────────────────────────────────────────────────────
function FieldCard({ field, index, onChange, onDelete }) {
  const needsOptions = ["select", "radio", "checkbox"].includes(field.type);

  return (
    <div className="field-card">
      <div className="field-row">
        <span className="field-index">#{index + 1}</span>

        <input
          className="field-input"
          placeholder="Field label…"
          value={field.label}
          onChange={e => onChange({ ...field, label: e.target.value })}
        />

        <select
          className="field-select"
          value={field.type}
          onChange={e => onChange({ ...field, type: e.target.value, options: "" })}
          style={{ maxWidth: 120 }}
        >
          {FIELD_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <button className="delete-btn" onClick={onDelete} title="Remove field">✕</button>
      </div>

      <div className="field-row" style={{ paddingLeft: "2rem" }}>
        <input
          className="field-input"
          placeholder="Placeholder text (optional)…"
          value={field.placeholder}
          onChange={e => onChange({ ...field, placeholder: e.target.value })}
        />
        <label className="field-required">
          <input
            type="checkbox"
            checked={field.required}
            onChange={e => onChange({ ...field, required: e.target.checked })}
          />
          Required
        </label>
      </div>

      {needsOptions && (
        <div style={{ paddingLeft: "2rem" }}>
          <div className="options-hint">Options (comma-separated):</div>
          <input
            className="options-input"
            placeholder="Option A, Option B, Option C"
            value={field.options}
            onChange={e => onChange({ ...field, options: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

// ─── PreviewField Component ──────────────────────────────────────────────────
function PreviewField({ field, value, onChange }) {
  const opts = field.options
    ? field.options.split(",").map(o => o.trim()).filter(Boolean)
    : [];

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          className="preview-textarea"
          placeholder={field.placeholder}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      );

    case "select":
      return (
        <select
          className="preview-select"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        >
          <option value="">— choose —</option>
          {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      );

    case "radio":
      return (
        <div className="preview-radio-group">
          {opts.map(o => (
            <label key={o} className="preview-radio-label">
              <input
                type="radio"
                name={`radio-${field.id}`}
                value={o}
                checked={value === o}
                onChange={() => onChange(o)}
              />
              {o}
            </label>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className="preview-checkbox-group">
          {opts.map(o => {
            const checked = Array.isArray(value) ? value.includes(o) : false;
            return (
              <label key={o} className="preview-checkbox-label">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    const next = checked
                      ? (value || []).filter(v => v !== o)
                      : [...(value || []), o];
                    onChange(next);
                  }}
                />
                {o}
              </label>
            );
          })}
        </div>
      );

    default:
      return (
        <input
          className="preview-input"
          type={field.type}
          placeholder={field.placeholder}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      );
  }
}

// ─── Main App Component ──────────────────────────────────────────────────────
function App() {
  const [formName, setFormName]   = useState("My Form");
  const [fields, setFields]       = useState([blankField()]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [toast, setToast]         = useState("");

  const addField = () => setFields(prev => [...prev, blankField()]);

  const updateField = (id, updated) =>
    setFields(prev => prev.map(f => f.id === id ? updated : f));

  const deleteField = id =>
    setFields(prev => prev.filter(f => f.id !== id));

  const updateResponse = (id, val) =>
    setResponses(prev => ({ ...prev, [id]: val }));

  const saveForm = () => {
    const schema = { name: formName, fields };
    const saveForm = async () => {
  const schema = { name: formName, fields };

  const res = await fetch("http://localhost:5000/api/forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(schema),
  });

  const data = await res.json();
  console.log("Saved! Form ID:", data.formId);
  showToast("Form saved to database!");
};

    // When backend is ready, replace console.log with:
    // await fetch("http://localhost:5000/api/forms", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(schema),
    // });

    showToast("Form schema saved! (check console for JSON)");
  };

  const handleSubmit = () => {
    const result = {};
    fields.forEach(f => {
      result[f.label || `field_${f.id}`] = responses[f.id] ?? "";
    });
    setSubmitted(result);
    showToast("Response submitted!");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const schema = { name: formName, fields };

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* ── LEFT: Builder ─────────────────────────────────── */}
        <div className="builder">
          <div>
            <div className="panel-label">Form Builder</div>
            <div className="panel-title">Design your<br />form schema</div>
          </div>

          <input
            className="form-name-input"
            value={formName}
            onChange={e => setFormName(e.target.value)}
            placeholder="Form title…"
          />

          {fields.length === 0 && (
            <div className="empty-state">No fields yet. Add one below ↓</div>
          )}

          {fields.map((field, idx) => (
            <FieldCard
              key={field.id}
              field={field}
              index={idx}
              onChange={updated => updateField(field.id, updated)}
              onDelete={() => deleteField(field.id)}
            />
          ))}

          <div className="btn-row">
            <button className="btn btn-add" onClick={addField}>+ Add Field</button>
            <button
              className="btn btn-save"
              onClick={saveForm}
              disabled={fields.length === 0}
            >
              Save Schema ↗
            </button>
          </div>

          {toast && <div className="toast">✓ {toast}</div>}

          <div className="schema-box">
            {JSON.stringify(schema, null, 2)}
          </div>
        </div>

        {/* ── RIGHT: Live Preview ───────────────────────────── */}
        <div className="preview">
          <div className="panel-label" style={{ marginBottom: "1rem" }}>Live Preview</div>

          <div className="preview-card">
            <div className="preview-title">{formName || "Untitled Form"}</div>
            <div className="preview-subtitle">FILL OUT THE FORM BELOW</div>

            {fields.length === 0 && (
              <div style={{ color: "#444", fontFamily: "'DM Mono', monospace", fontSize: "0.8rem" }}>
                Add fields on the left to see your form here.
              </div>
            )}

            {fields.map(field => (
              <div key={field.id} className="preview-field">
                <label className="preview-label">
                  {field.label || <span style={{ color: "#444" }}>Unlabelled field</span>}
                  {field.required && <span className="required-star">*</span>}
                </label>
                <PreviewField
                  field={field}
                  value={responses[field.id]}
                  onChange={val => updateResponse(field.id, val)}
                />
              </div>
            ))}

            {fields.length > 0 && !submitted && (
              <button className="btn-submit" onClick={handleSubmit}>
                Submit Response
              </button>
            )}

            {submitted && (
              <div className="submitted-box">
                ✓ Submitted:{"\n\n"}{JSON.stringify(submitted, null, 2)}
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
