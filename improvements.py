########################## NCLEX Question validation ###########################
from pydantic import BaseModel, validator
import re

class NCLEXQuestion(BaseModel):
    id: int
    question: str
    options: list[str]
    correctAnswer: int
    explanation: str  # Markdown string

    @validator("explanation")
    def explanation_must_be_markdown(cls, value):
        # Check if wrapped in backticks or contains markdown tokens
        markdown_indicators = ["**", "__", "*", "_", "`", "#", "-", ">"]
        if not any(md in value for md in markdown_indicators):
            raise ValueError("Explanation must contain Markdown formatting.")
        return value

    @validator("explanation")
    def must_be_wrapped_in_backticks(cls, value):
        if not (value.startswith("`") and value.endswith("`")):
            raise ValueError("Explanation must be wrapped in backticks (`).")
        return value


######################### CONVERT MARKDOWN DIRECTLY TO HTML WITH PYTHON ##############

# Installation 
!pip install markdown-it-py mdit-py-plugins

# Snippet
from markdown_it import MarkdownIt

md = MarkdownIt("commonmark", {"html": True, "breaks": True})
markdown_text = "**Hello**, _world_!"
html_output = md.render(markdown_text)

print(html_output)   # <p><strong>Hello</strong>, <em>world</em>!</p>


#################### Markdown parsing with plugins ###################
from markdown_it import MarkdownIt
from mdit_py_plugins.footnote import footnote_plugin

md = MarkdownIt().use(footnote_plugin)
text = "Here is a footnote[^1]\n\n[^1]: Footnote text."
html = md.render(text)      # This can allow you to parse tables, footnote etc


#################### Table Parsing ###############################
from markdown_it import MarkdownIt

md = MarkdownIt().enable("table")
markdown = """
| Name  | Age |
|-------|-----|
| Alice | 25  |
| Bob   | 30  |
"""
html = md.render(markdown)
print(html)

# Alternative approach 
from markdown_it import MarkdownIt
from mdit_py_plugins.tables import tables_plugin

md = MarkdownIt().use(tables_plugin)
markdown = """
| Name  | Age |
|-------|-----|
| Alice | 25  |
| Bob   | 30  |
"""
html = md.render(markdown)
print(html)
