import re

css_filepath = r'd:\New folder (3)\llm-arena\site\src\index.css'
with open(css_filepath, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Revert --font-sans to Switzer so the whole site (including header and footer) uses it
css_content = re.sub(
    r"--font-sans:\s*ui-sans-serif,\s*system-ui,\s*-apple-system,\s*BlinkMacSystemFont,\s*\"Segoe UI\",\s*Roboto,\s*\"Helvetica Neue\",\s*Arial,\s*sans-serif;",
    "--font-sans: 'Switzer', ui-sans-serif, system-ui, sans-serif;",
    css_content
)

# And if I had --font-heading, I can leave it or remove it, but since --font-sans is Switzer, 
# font-heading can also just be Switzer, or I can remove the h1,h2 @apply entirely.
# The issue was that the header and footer reverted to system fonts, which the user called a "different font".

with open(css_filepath, 'w', encoding='utf-8') as f:
    f.write(css_content)
