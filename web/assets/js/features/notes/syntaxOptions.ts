const syntaxOptions = [
  { value: "abap", label: "abap" },
  { value: "abnf", label: "abnf" },
  { value: "actionscript", label: "actionscript" },
  { value: "ada", label: "ada" },
  { value: "agda", label: "agda" },
  { value: "al", label: "al" },
  { value: "antlr4", label: "antlr4" },
  { value: "apacheconf", label: "apacheconf" },
  { value: "apl", label: "apl" },
  { value: "applescript", label: "applescript" },
  { value: "aql", label: "aql" },
  { value: "arduino", label: "arduino" },
  { value: "arff", label: "arff" },
  { value: "asciidoc", label: "asciidoc" },
  { value: "asm6502", label: "asm6502" },
  { value: "aspnet", label: "aspnet" },
  { value: "autohotkey", label: "autohotkey" },
  { value: "autoit", label: "autoit" },
  { value: "bash", label: "bash" },
  { value: "basic", label: "basic" },
  { value: "batch", label: "batch" },
  { value: "bbcode", label: "bbcode" },
  { value: "bison", label: "bison" },
  { value: "bnf", label: "bnf" },
  { value: "brainfuck", label: "brainfuck" },
  { value: "brightscript", label: "brightscript" },
  { value: "bro", label: "bro" },
  { value: "c", label: "c" },
  { value: "cil", label: "cil" },
  { value: "clike", label: "clike" },
  { value: "clojure", label: "clojure" },
  { value: "cmake", label: "cmake" },
  { value: "coffeescript", label: "coffeescript" },
  { value: "concurnas", label: "concurnas" },
  { value: "cpp", label: "cpp" },
  { value: "crystal", label: "crystal" },
  { value: "csharp", label: "csharp" },
  { value: "csp", label: "csp" },
  { value: "css-extras", label: "css-extras" },
  { value: "css", label: "css" },
  { value: "cypher", label: "cypher" },
  { value: "d", label: "d" },
  { value: "dart", label: "dart" },
  { value: "dax", label: "dax" },
  { value: "dhall", label: "dhall" },
  { value: "diff", label: "diff" },
  { value: "django", label: "django" },
  { value: "dns-zone-file", label: "dns-zone-file" },
  { value: "docker", label: "docker" },
  { value: "ebnf", label: "ebnf" },
  { value: "editorconfig", label: "editorconfig" },
  { value: "eiffel", label: "eiffel" },
  { value: "ejs", label: "ejs" },
  { value: "elixir", label: "elixir" },
  { value: "elm", label: "elm" },
  { value: "erb", label: "erb" },
  { value: "erlang", label: "erlang" },
  { value: "etlua", label: "etlua" },
  { value: "excel-formula", label: "excel-formula" },
  { value: "factor", label: "factor" },
  { value: "firestore-security-rules", label: "firestore-security-rules" },
  { value: "flow", label: "flow" },
  { value: "fortran", label: "fortran" },
  { value: "fsharp", label: "fsharp" },
  { value: "ftl", label: "ftl" },
  { value: "gcode", label: "gcode" },
  { value: "gdscript", label: "gdscript" },
  { value: "gedcom", label: "gedcom" },
  { value: "gherkin", label: "gherkin" },
  { value: "git", label: "git" },
  { value: "glsl", label: "glsl" },
  { value: "gml", label: "gml" },
  { value: "go", label: "go" },
  { value: "graphql", label: "graphql" },
  { value: "groovy", label: "groovy" },
  { value: "haml", label: "haml" },
  { value: "handlebars", label: "handlebars" },
  { value: "haskell", label: "haskell" },
  { value: "haxe", label: "haxe" },
  { value: "hcl", label: "hcl" },
  { value: "hlsl", label: "hlsl" },
  { value: "hpkp", label: "hpkp" },
  { value: "hsts", label: "hsts" },
  { value: "http", label: "http" },
  { value: "ichigojam", label: "ichigojam" },
  { value: "icon", label: "icon" },
  { value: "iecst", label: "iecst" },
  { value: "ignore", label: "ignore" },
  { value: "inform7", label: "inform7" },
  { value: "ini", label: "ini" },
  { value: "io", label: "io" },
  { value: "j", label: "j" },
  { value: "java", label: "java" },
  { value: "javadoc", label: "javadoc" },
  { value: "javadoclike", label: "javadoclike" },
  { value: "javascript", label: "javascript" },
  { value: "javastacktrace", label: "javastacktrace" },
  { value: "jolie", label: "jolie" },
  { value: "jq", label: "jq" },
  { value: "js-extras", label: "js-extras" },
  { value: "js-templates", label: "js-templates" },
  { value: "jsdoc", label: "jsdoc" },
  { value: "json", label: "json" },
  { value: "json5", label: "json5" },
  { value: "jsonp", label: "jsonp" },
  { value: "jsstacktrace", label: "jsstacktrace" },
  { value: "jsx", label: "jsx" },
  { value: "julia", label: "julia" },
  { value: "keyman", label: "keyman" },
  { value: "kotlin", label: "kotlin" },
  { value: "latex", label: "latex" },
  { value: "latte", label: "latte" },
  { value: "less", label: "less" },
  { value: "lilypond", label: "lilypond" },
  { value: "liquid", label: "liquid" },
  { value: "lisp", label: "lisp" },
  { value: "livescript", label: "livescript" },
  { value: "llvm", label: "llvm" },
  { value: "lolcode", label: "lolcode" },
  { value: "lua", label: "lua" },
  { value: "makefile", label: "makefile" },
  { value: "markdown", label: "markdown" },
  { value: "markup-templating", label: "markup-templating" },
  { value: "markup", label: "markup" },
  { value: "matlab", label: "matlab" },
  { value: "mel", label: "mel" },
  { value: "mizar", label: "mizar" },
  { value: "monkey", label: "monkey" },
  { value: "moonscript", label: "moonscript" },
  { value: "n1ql", label: "n1ql" },
  { value: "n4js", label: "n4js" },
  { value: "nand2tetris-hdl", label: "nand2tetris-hdl" },
  { value: "nasm", label: "nasm" },
  { value: "neon", label: "neon" },
  { value: "nginx", label: "nginx" },
  { value: "nim", label: "nim" },
  { value: "nix", label: "nix" },
  { value: "nsis", label: "nsis" },
  { value: "objectivec", label: "objectivec" },
  { value: "ocaml", label: "ocaml" },
  { value: "opencl", label: "opencl" },
  { value: "oz", label: "oz" },
  { value: "parigp", label: "parigp" },
  { value: "parser", label: "parser" },
  { value: "pascal", label: "pascal" },
  { value: "pascaligo", label: "pascaligo" },
  { value: "pcaxis", label: "pcaxis" },
  { value: "peoplecode", label: "peoplecode" },
  { value: "perl", label: "perl" },
  { value: "php-extras", label: "php-extras" },
  { value: "php", label: "php" },
  { value: "phpdoc", label: "phpdoc" },
  { value: "plsql", label: "plsql" },
  { value: "powerquery", label: "powerquery" },
  { value: "powershell", label: "powershell" },
  { value: "processing", label: "processing" },
  { value: "prolog", label: "prolog" },
  { value: "properties", label: "properties" },
  { value: "protobuf", label: "protobuf" },
  { value: "pug", label: "pug" },
  { value: "puppet", label: "puppet" },
  { value: "pure", label: "pure" },
  { value: "purebasic", label: "purebasic" },
  { value: "python", label: "python" },
  { value: "q", label: "q" },
  { value: "qml", label: "qml" },
  { value: "qore", label: "qore" },
  { value: "r", label: "r" },
  { value: "racket", label: "racket" },
  { value: "reason", label: "reason" },
  { value: "regex", label: "regex" },
  { value: "renpy", label: "renpy" },
  { value: "rest", label: "rest" },
  { value: "rip", label: "rip" },
  { value: "roboconf", label: "roboconf" },
  { value: "robotframework", label: "robotframework" },
  { value: "ruby", label: "ruby" },
  { value: "rust", label: "rust" },
  { value: "sas", label: "sas" },
  { value: "sass", label: "sass" },
  { value: "scala", label: "scala" },
  { value: "scheme", label: "scheme" },
  { value: "scss", label: "scss" },
  { value: "shell-session", label: "shell-session" },
  { value: "smali", label: "smali" },
  { value: "smalltalk", label: "smalltalk" },
  { value: "smarty", label: "smarty" },
  { value: "solidity", label: "solidity" },
  { value: "solution-file", label: "solution-file" },
  { value: "soy", label: "soy" },
  { value: "sparql", label: "sparql" },
  { value: "splunk-spl", label: "splunk-spl" },
  { value: "sqf", label: "sqf" },
  { value: "sql", label: "sql" },
  { value: "stylus", label: "stylus" },
  { value: "swift", label: "swift" },
  { value: "t4-cs", label: "t4-cs" },
  { value: "t4-templating", label: "t4-templating" },
  { value: "t4-vb", label: "t4-vb" },
  { value: "tap", label: "tap" },
  { value: "tcl", label: "tcl" },
  { value: "textile", label: "textile" },
  { value: "toml", label: "toml" },
  { value: "tsx", label: "tsx" },
  { value: "tt2", label: "tt2" },
  { value: "turtle", label: "turtle" },
  { value: "twig", label: "twig" },
  { value: "typescript", label: "typescript" },
  { value: "unrealscript", label: "unrealscript" },
  { value: "vala", label: "vala" },
  { value: "vbnet", label: "vbnet" },
  { value: "velocity", label: "velocity" },
  { value: "verilog", label: "verilog" },
  { value: "vhdl", label: "vhdl" },
  { value: "vim", label: "vim" },
  { value: "visual-basic", label: "visual-basic" },
  { value: "warpscript", label: "warpscript" },
  { value: "wasm", label: "wasm" },
  { value: "wiki", label: "wiki" },
  { value: "xeora", label: "xeora" },
  { value: "xml-doc", label: "xml-doc" },
  { value: "xojo", label: "xojo" },
  { value: "xquery", label: "xquery" },
  { value: "yaml", label: "yaml" },
  { value: "yang", label: "yang" },
  { value: "zig", label: "zig" },
];
export default syntaxOptions;
