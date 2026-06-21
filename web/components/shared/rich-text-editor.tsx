"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { cn } from "@/lib/utils";

function contentToHtml(content: Content) {
  return typeof content === "string" ? content : "";
}

function isEmptyHtml(html: string) {
  const stripped = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return stripped.length === 0;
}

interface RichTextEditorProps {
  name?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function RichTextEditor({
  name,
  defaultValue = "",
  value: controlledValue,
  onChange,
  placeholder,
  required,
  className,
}: RichTextEditorProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (name && inputRef.current) {
      inputRef.current.value = value;
    }
  }, [name, value]);

  function handleChange(content: Content) {
    const html = contentToHtml(content);
    if (!isControlled) {
      setInternalValue(html);
    }
    onChange?.(html);
    if (name && inputRef.current) {
      inputRef.current.value = html;
    }
  }

  return (
    <div className={cn("mt-1.5", className)}>
      {name ? (
        <input
          ref={inputRef}
          type="hidden"
          name={name}
          defaultValue={defaultValue}
          required={required ? !isEmptyHtml(value) : undefined}
        />
      ) : null}
      <MinimalTiptapEditor
        value={value || defaultValue}
        onChange={handleChange}
        output="html"
        placeholder={placeholder}
        editable
        autofocus={false}
        immediatelyRender={false}
        editorContentClassName="min-h-[160px]"
      />
    </div>
  );
}
