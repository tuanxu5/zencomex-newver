import { useEffect, useRef, useState } from "react";

//icon
import CodeIcon from "@mui/icons-material/Code";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
//expand
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Heading from "@tiptap/extension-heading";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Popover,
  Select,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { Link } from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChromePicker } from "react-color";
import ImageResize from "tiptap-extension-resize-image";
import LineHeight from "./lineHeight";
import TocMark from "./tocMark";

import axiosInstance, { BASE_URL } from "../../utils/axios";
import { fileToBase64 } from "../../utils/file-to-base64";
import { ToastMessage } from "../custom-toast";
import { Scrollbar } from "../scrollbar";
import { FontSize } from "./fontsize";
import Iframe from "./iframeYoutube";
import TableOfContents from "./tableOfContents";

const StyledEditorContent = styled(EditorContent)(({ height }) => ({
  ".ProseMirror": {
    minHeight: "100%",
    width: "100%",
    border: "0px solid #ddd",
    overflowY: "auto",
    fontFamily: '"Arial", serif',
    fontSize: "16px",
    fontFamilies: '"Arial", serif',
  },
  p: {
    margin: "0px",
  },
  ul: {
    padding: "0 1rem",
  },
  ol: {
    padding: "0 1rem",
  },
  h1: {
    margin: "0px",
  },
  h2: {
    margin: "0px",
  },
  h3: {
    margin: "0px",
  },
  h4: {
    margin: "0px",
  },
  h5: {
    margin: "0px",
  },
  h6: {
    margin: "0px",
  },
  a: {
    cursor: "pointer",
  },
  img: {
    maxWidth: "100% !important",
  },
  "div img": {
    maxWidth: "100% !important",
  },
  "div:has(img)": {
    maxWidth: "100% !important",
  },
  iframe: {
    margin: "0 auto",
  },
}));

const toolbarMenu = [
  { value: "bold", label: "In đậm", icon: <FormatBoldIcon /> },
  { value: "italic", label: "In nghiêng", icon: <FormatItalicIcon /> },
  { value: "underline", label: "Gạch chân", icon: <FormatUnderlinedIcon /> },
  { value: "bullet", label: "Bullet List", icon: <FormatListBulletedIcon /> },
  { value: "number", label: "Number List", icon: <FormatListNumberedIcon /> },
  { value: "left", label: "Căn trái", icon: <FormatAlignLeftIcon /> },
  { value: "center", label: "Căn giữa", icon: <FormatAlignCenterIcon /> },
  { value: "right", label: "Căn phải", icon: <FormatAlignRightIcon /> },
  { value: "justify", label: "Căn đều", icon: <FormatAlignJustifyIcon /> },
];

const headingLevels = [
  { value: "normal", label: "Normal" },
  { value: 1, label: "Heading 1" },
  { value: 2, label: "Heading 2" },
  { value: 3, label: "Heading 3" },
  { value: 4, label: "Heading 4" },
  { value: 5, label: "Heading 5" },
  { value: 6, label: "Heading 6" },
];

const fontSizes = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "24", "30", "36", "48", "60", "72", "96"];
const fontFamilies = ['"Arial", serif'];

const TiptapEditor = ({
  isDisable = false,
  isCreate,
  contentEditor,
  onChangeContent,
  fileEditor,
  onUploadImage,
  onDeleteImage,
  onChangeFile,
  expand = true,
  initialHeight = "450px",
  initialFontFamily = '"Arial", serif',
  initialFontSize = 16,
  initialHeading = "normal",
  initialColor = "#000000",
  isBorderContent = false,
}) => {
  const editorRef = useRef(null);
  const [height, setHeight] = useState(isDisable ? "0px" : initialHeight);
  const [font, setFont] = useState(initialFontFamily);
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [selectedHeading, setSelectedHeading] = useState(initialHeading);
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState(initialColor);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph", "image", "iframe"],
      }),
      Color,
      FontSize,
      FontFamily,
      Link,
      Image,
      ImageResize.configure({
        resizeImage: true,
        HTMLAttributes: {
          style: "margin: 0 auto; display: block;",
        },
      }),
      Iframe,
      TocMark,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      LineHeight.configure({
        types: ["paragraph", "heading"], // Áp dụng cho paragraph và heading
      }),
      // CodeBlockLowlight.configure({
      //     lowlight, // Cấu hình lowlight cho việc highlight code
      // }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    immediatelyRender: false,
    content: contentEditor,
    onUpdate: () => {
      handleGetContent();
    },
    editable: !isDisable,
    onFocus: (view, pos, event) => {
      // if (node?.type.name === "image") {
      //   setSelectedImage(pos);
      //   setAltText(node.attrs.alt || "");
      //   setTitleText(node.attrs.title || "");
      // }
    },
  });
  const toggleBold = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).toggleBold().run();
    const content = editor.getHTML();
    onChangeContent(content);
  };

  const toggleItalic = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).toggleItalic().run();
  };
  const toggleUnderline = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).toggleUnderline().run();
  };
  const toggleHeading = (level) => {
    const { from, to } = editor.state.selection;
    if (level === "normal") {
      editor.chain().setTextSelection({ from, to }).setParagraph().run();
    } else {
      editor.chain().setTextSelection({ from, to }).toggleHeading({ level }).run();
    }
  };
  const toggleBulletList = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).toggleBulletList().run();
  };
  const toggleOrderedList = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).toggleOrderedList().run();
  };
  const alignLeft = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).setTextAlign("left").run();
  };
  const alignCenter = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).setTextAlign("center").run();
  };
  const alignRight = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).setTextAlign("right").run();
  };
  const alignJustify = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).setTextAlign("justify").run();
  };

  const handleOnclickToolbar = (value) => {
    switch (value) {
      case "bold":
        toggleBold();
        break;
      case "italic":
        toggleItalic();
        break;
      case "underline":
        toggleUnderline();
        break;
      case "bullet":
        toggleBulletList();
        break;
      case "number":
        toggleOrderedList();
        break;
      case "left":
        alignLeft();
        break;
      case "center":
        alignCenter();
        break;
      case "right":
        alignRight();
        break;
      case "justify":
        alignJustify();
        break;
      default:
        break;
    }
  };

  const handleFontSizeChange = (event) => {
    const { from, to } = editor.state.selection;
    const size = event.target.value;
    setFontSize(size);
    editor.chain().setTextSelection({ from, to }).setFontSize(`${size}px`).run();
  };

  const handleFontFamilyChange = (event) => {
    const { from, to } = editor.state.selection;
    const family = event.target.value;
    setFont(family);
    editor.chain().setTextSelection({ from, to }).setFontFamily(family).run();
  };

  const handleHeadingChange = (event) => {
    const level = event.target.value;
    setSelectedHeading(level);
    toggleHeading(level);
  };

  // COLOR
  const handleColorChange = (color) => {
    const { from, to } = editor.state.selection;
    // setColor(color.hex);
    editor.chain().setTextSelection({ from, to }).setColor(color.hex).run();
  };

  const handleColorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-popover" : undefined;

  // ADD LINK
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const addLink = () => {
    const { from, to } = editor.state.selection;
    if (linkUrl) {
      const isZencomexURL = (url) => /^(https?:\/\/)?(www\.)?zencomex\.com(\/|$)/.test(url);
      editor
        .chain()
        .setTextSelection({ from, to })
        .extendMarkRange("link")
        .setLink({
          href: linkUrl,
          rel: isZencomexURL(linkUrl) ? "noopener noreferrer" : "noopener noreferrer nofollow",
        })
        .run();
    }
    setLinkDialogOpen(false);
    setLinkUrl("");
  };

  const unsetLink = () => {
    const { from, to } = editor.state.selection;
    editor.chain().setTextSelection({ from, to }).unsetLink().run();
  };

  // ADD IMAGE
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState({});
  const [listImageUrl, setListImageUrl] = useState([]);
  const [titleImage, setTitleImage] = useState("");
  const [altImage, setAltImage] = useState("");
  const handleOpenDialogImage = () => {
    setImageDialogOpen(true);
  };

  const handleCloseDialogImage = () => {
    setAltImage("");
    setImageUrl("");
    setTitleImage("");
    setImageDialogOpen(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const image = await fileToBase64(file);
    setImageUrl({
      url: image,
      file: file,
    });
    setAltImage(file.name);
  };

  const handleClickEmbedImage = async () => {
    if (imageUrl && imageUrl.file) {
      await onUploadImage(imageUrl.file, altImage, titleImage, editor);
      handleCloseDialogImage();
    } else {
      ToastMessage("Bạn chưa thêm hình ảnh", "warning");
    }
  };

  //Update list image Url in editor
  useEffect(() => {
    if (!isDisable) {
      const newList = fileEditor?.map((file) => `${BASE_URL}/upload/${file.link}`);
      setListImageUrl(newList);
    }
  }, [fileEditor]);

  const [openDialog, setOpenDialog] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEmbedYoutube = () => {
    const { from, to } = editor.state.selection;
    const url = youtubeURL;
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (match && match[1]) {
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      // Insert the iframe using the `insertIframe` command
      editor
        .chain()
        .setTextSelection({ from, to })
        .insertIframe({
          src: embedUrl,
          width: "560",
          height: "315",
          frameborder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: true,
        })
        .run();
    } else {
      console.error("Invalid YouTube URL");
    }

    handleCloseDialog();
  };

  // change to view html
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const toggleMode = () => {
    setIsHtmlMode(!isHtmlMode);
    if (isHtmlMode) {
      editor.commands.setContent(contentEditor);
    } else {
      onChangeContent(editor.getHTML());
    }
  };
  const handleHtmlChange = (e) => {
    onChangeContent(e.target.value);
  };

  //
  const [elenmentOnlick, setElementOnlick] = useState({});
  const handleKeyDown = async (event) => {
    const selection = editor?.state.selection;
    const { from, to } = selection; // Lấy vị trí con trỏ hiện tại

    // check up or down
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      console.log("a");
    }

    // Kiểm tra xem phím nhấn có phải là Backspace hoặc Delete
    if (event.key === "Backspace" || event.key === "Delete") {
      if (elenmentOnlick && elenmentOnlick.tag === "IMG") {
        const urlImage = elenmentOnlick.image.split("/upload/")[1];
        if (isCreate) {
          try {
            await axiosInstance.post("/upload/folder/delete", {
              link: [urlImage],
            });
          } catch (error) {
            console.log("er", error);
          }
        } else {
          onDeleteImage([urlImage]);
        }
        setElementOnlick({});
        onChangeFile((pre) => pre.filter((item) => item.link !== urlImage));
      }
      editor.commands.deleteSelection(); // Xóa nội dung hiện tại
    }
  };

  // Check type element
  const tagHead = [
    { name: "H1", value: 1 },
    { name: "H2", value: 2 },
    { name: "H3", value: 3 },
    { name: "H4", value: 4 },
    { name: "H5", value: 5 },
    { name: "H6", value: 6 },
  ];
  const handleEditorClick = (event) => {
    const target = event.target; // Phần tử DOM mà người dùng click vào

    // Kiểm tra loại thẻ
    const tagName = target.tagName;
    const checkHead = tagHead.find((e) => e.name === tagName);

    // Kiểm tra chi tiết thẻ
    setSelectedHeading("normal");
    setFontSize("16");
    setFont("Arial");
    setElementOnlick({});
    if (tagName === "IMG") {
      setElementOnlick({
        tag: tagName,
        image: target.src,
      });
    } else if (tagName === "P") {
      const spanElement = target.querySelector("span"); // Tìm thẻ <span> bên trong thẻ <p>
      if (spanElement) {
        const fs = window.getComputedStyle(spanElement).fontSize;
        const ff = window.getComputedStyle(spanElement).fontFamily;
        const newfs = parseInt(fs);
        const newff = ff.startsWith('"') ? ff.slice(1, -1) : ff;
        setFontSize(newfs);
        setFont(newff);
      } else {
        // Nếu không có <span> trong <p>, lấy font-size của <p>
        const fs = window.getComputedStyle(target).fontSize;
        const ff = window.getComputedStyle(target).fontFamily;
        const newfs = parseInt(fs);
        const newff = ff.startsWith('"') ? ff.slice(1, -1) : ff;
        setFontSize(newfs);
        setFont(newff);
      }
    } else if (tagName === "SPAN") {
      const fs = window.getComputedStyle(target).fontSize;
      const ff = window.getComputedStyle(target).fontFamily;
      const newfs = parseInt(fs);
      const newff = ff.startsWith('"') ? ff.slice(1, -1) : ff;
      setFontSize(newfs);
      setFont(newff);
    } else if (checkHead) {
      setSelectedHeading(checkHead.value);
      const spanElement = target.querySelector("span"); // Tìm thẻ <span> bên trong thẻ <p>
      if (spanElement) {
        const fs = window.getComputedStyle(spanElement).fontSize;
        const ff = window.getComputedStyle(spanElement).fontFamily;
        const newfs = parseInt(fs);
        const newff = ff.startsWith('"') ? ff.slice(1, -1) : ff;
        setFontSize(newfs);
        setFont(newff);
      } else {
        // Nếu không có <span> trong <p>, lấy font-size của <p>
        const fs = window.getComputedStyle(target).fontSize;
        const ff = window.getComputedStyle(target).fontFamily;
        const newfs = parseInt(fs);
        const newff = ff.startsWith('"') ? ff.slice(1, -1) : ff;
        setFontSize(newfs);
        setFont(newff);
      }
    } else {
    }
  };

  const handleGetContent = () => {
    const htmlContent = editor.getHTML();
    onChangeContent(htmlContent);
  };

  // expand content
  const [expendContent, setExpendContent] = useState(expand);

  // table of contents
  const handleClickTableOfContent = () => {
    const { from, to } = editor.state.selection;
    if (from !== to) {
      const id = `toc-${Date.now()}`;
      editor.chain().setTextSelection({ from, to }).setMark("tocMark", { id }).run();
    } else {
      ToastMessage("Bạn chưa chọn đoạn text làm mục lục", "warning");
    }
  };

  const [tocItems, setTocItems] = useState([]);
  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (first) {
      if (editor) {
        editor?.commands.setContent(contentEditor);
        if (!isDisable) {
          setFirst(false);
        }
      }
    }
    if (contentEditor === "") {
      setTocItems([]);
      return;
    }

    const updateTocItemsFromContent = () => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = contentEditor;

      const marks = Array.from(tempContainer.querySelectorAll("span[data-toc-id]"));
      const allHeadings = Array.from(tempContainer.querySelectorAll("h1, h2, h3, h4, h5, h6"));

      if (allHeadings.length == 0) {
        return;
      }

      // Lấy danh sách tất cả các cấp heading xuất hiện, sắp xếp từ nhỏ đến lớn
      const uniqueLevels = [...new Set(allHeadings?.map((h) => parseInt(h.tagName.replace("H", ""), 10)))].sort(
        (a, b) => a - b
      );

      // Chỉ giữ lại 3 cấp heading nhỏ nhất xuất hiện
      const selectedLevels = uniqueLevels.slice(0, 3);
      const levelMap = Object.fromEntries(selectedLevels?.map((level, index) => [level, index + 1]));

      let level1Index = 1;
      let level2Index = 0;
      let level3Index = 0;

      // 🔹 Tìm vị trí của heading cấp 1 đầu tiên trong tài liệu
      const firstLevel1Mark = marks.find((mark) => {
        const heading = mark?.closest(selectedLevels?.map((l) => `h${l}`).join(", "));
        return heading && levelMap[parseInt(heading.tagName.replace("H", ""), 10)] === 1;
      });

      // 🔹 Nếu không có heading cấp 1, trả về danh sách trống
      if (!firstLevel1Mark) {
        setTocItems([]);
        return;
      }

      let foundFirstLevel1 = false; // Cờ đánh dấu khi gặp heading cấp 1 đầu tiên

      const newItems = marks
        ?.map((mark) => {
          const heading = mark.closest(selectedLevels?.map((l) => `h${l}`).join(", "));
          if (!heading) return null;

          const level = parseInt(heading.tagName.replace("H", ""), 10);
          const mappedLevel = levelMap[level];
          let number = "";

          // 🔹 Bỏ qua các mục trước heading cấp 1 đầu tiên
          if (!foundFirstLevel1 && mappedLevel === 1) {
            foundFirstLevel1 = true;
          }
          if (!foundFirstLevel1) return null;

          if (mappedLevel === 1) {
            number = `${level1Index}`;
            level1Index++;
            level2Index = 0;
            level3Index = 0;
          } else if (mappedLevel === 2) {
            level2Index++;
            number = `${level1Index - 1}.${level2Index}`;
            level3Index = 0;
          } else if (mappedLevel === 3) {
            level3Index++;
            number = `${level1Index - 1}.${level2Index}.${level3Index}`;
          }

          return {
            id: mark.getAttribute("data-toc-id"),
            text: mark.innerText,
            level: mappedLevel,
            number,
          };
        })
        .filter(Boolean);

      setTocItems(newItems);
    };

    updateTocItemsFromContent();
  }, [contentEditor]);

  // Line Height
  const [lineHeightEditor, setLineHeightEditor] = useState(1.5);

  const handleChangeLineHeight = (e, value) => {
    setLineHeightEditor(value);
    const height = value.toString();
    editor.chain().focus().setLineHeight(height).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <Box width="100%">
      <Scrollbar
        sx={{
          maxHeight: isDisable ? (expendContent ? "auto" : "80vh") : "60vh",
          overflowX: "hidden",
          overflow: isDisable ? "hidden" : "auto",
        }}
      >
        {!isDisable && (
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 9999,
              backgroundColor: "#EEEEEE",
              p: 2,
              width: "99%",
              borderRadius: 2,
              ml: 0.7,
              mb: 1,
            }}
          >
            <div
              spacing={1}
              style={{
                // width: 1000,
                display: "flex",
                flexDecoration: "row",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              <FormControl variant="outlined" sx={{ minWidth: 100, height: 30 }}>
                <Select
                  value={selectedHeading}
                  onChange={handleHeadingChange}
                  displayEmpty
                  sx={{ height: 30, width: 120 }}
                >
                  {headingLevels?.map((heading) => (
                    <MenuItem key={heading.value} value={heading.value}>
                      {heading.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ minWidth: 80, height: 30 }}>
                <Select value={fontSize} onChange={handleFontSizeChange} displayEmpty sx={{ height: 30 }}>
                  {fontSizes?.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}px
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" sx={{ minWidth: 90, height: 30 }}>
                <Select value={font} onChange={handleFontFamilyChange} displayEmpty sx={{ height: 30 }}>
                  {fontFamilies?.map((family) => (
                    <MenuItem key={family} value={family}>
                      {family}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {toolbarMenu?.map((item) => (
                <Button
                  key={item.value}
                  onClick={() => handleOnclickToolbar(item.value)}
                  variant="outlined"
                  sx={{ height: 30, width: 40, p: 0, minWidth: 0 }}
                >
                  {item.icon}
                </Button>
              ))}
              <Button onClick={handleColorClick} variant="outlined" sx={{ minWidth: 0, height: 30, width: 40 }}>
                <ColorLensIcon />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <ChromePicker color={color} onChangeComplete={handleColorChange} />
              </Popover>
              <Button
                sx={{ width: 40, height: 30, minWidth: 0 }}
                variant="outlined"
                onClick={() => setLinkDialogOpen(true)}
              >
                <LinkIcon />
              </Button>
              <Button
                sx={{ width: 40, height: 30, minWidth: 0 }}
                variant="outlined"
                onClick={unsetLink}
                style={{ marginLeft: "10px" }}
              >
                <LinkOffIcon />
              </Button>
              <Button
                sx={{ width: 40, height: 30, minWidth: 0 }}
                variant="outlined"
                component="label"
                style={{ marginLeft: "10px" }}
                onClick={handleOpenDialogImage}
              >
                <ImageIcon />
                {/* <input type="file" accept="image/*" hidden onChange={handleFileChange} /> */}
              </Button>
              <Button sx={{ width: 40, height: 30, minWidth: 0 }} onClick={handleOpenDialog} variant="outlined">
                <YouTubeIcon />
              </Button>
              <Button sx={{ width: 40, height: 30, minWidth: 0 }} onClick={toggleMode} variant="outlined">
                {isHtmlMode ? <CodeIcon /> : <CodeOffIcon />}
              </Button>
              <Tooltip title="Đánh dấu làm mục lục">
                <Button
                  sx={{ width: 40, height: 30, minWidth: 0 }}
                  variant="outlined"
                  onClick={handleClickTableOfContent}
                >
                  <TextSnippetOutlinedIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Thêm bảng mới">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                >
                  Thêm bảng
                </Button>
              </Tooltip>
              <Tooltip title="Thêm cột đằng trước">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                  disabled={!editor.can().addColumnBefore()}
                >
                  Thêm cột trước
                </Button>
              </Tooltip>
              <Tooltip title="Thêm cột đằng sau">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                  disabled={!editor.can().addColumnAfter()}
                >
                  Thêm cột sau
                </Button>
              </Tooltip>
              <Tooltip title="Xoá cột">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                  disabled={!editor.can().deleteColumn()}
                >
                  Xoá cột
                </Button>
              </Tooltip>
              <Tooltip title="Thêm dòng trên">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                  disabled={!editor.can().addRowBefore()}
                >
                  Thêm dòng trên
                </Button>
              </Tooltip>
              <Tooltip title="Thêm dòng dưới">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                  disabled={!editor.can().addRowAfter()}
                >
                  Thêm dòng dưới
                </Button>
              </Tooltip>
              <Tooltip title="Xoá hàng">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                  disabled={!editor.can().deleteRow()}
                >
                  Xoá hàng
                </Button>
              </Tooltip>
              <Tooltip title="Xoá bảng">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().deleteTable().run()}
                  disabled={!editor.can().deleteTable()}
                >
                  Xoá bảng
                </Button>
              </Tooltip>
              <Tooltip title="Chuyển header cột">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
                  disabled={!editor.can().toggleHeaderColumn()}
                >
                  Toggle cột
                </Button>
              </Tooltip>
              <Tooltip title="Chuyển header dòng này">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                  disabled={!editor.can().toggleHeaderRow()}
                >
                  Toggle dòng
                </Button>
              </Tooltip>
              <Tooltip title="Chuyển header ô hiện tại">
                <Button
                  sx={{ height: 30, minWidth: 0, p: 1 }}
                  variant="outlined"
                  onClick={() => editor.chain().focus().toggleHeaderCell().run()}
                  disabled={!editor.can().toggleHeaderCell()}
                >
                  Toggle ô
                </Button>
              </Tooltip>
              <Tooltip title="Line height">
                <Box
                  sx={{
                    cursor: "pointer",
                  }}
                  width={150}
                  // mt={5}
                >
                  <Slider
                    size="small"
                    defaultValue={1.5}
                    min={0}
                    max={4}
                    step={0.1}
                    value={lineHeightEditor}
                    onChange={handleChangeLineHeight}
                    aria-label="Line Height"
                    valueLabelDisplay="on"
                    sx={{
                      borderRadius: "12px", // Tương đương border-radius của root
                      boxSizing: "content-box",
                      color: "#004db6", // Tùy chỉnh màu
                      padding: "0",
                      height: "1.8px",
                      mt: 3,
                      "& .MuiSlider-track": {
                        borderRadius: "12px", // Tạo bo góc cho track
                      },
                      "& .MuiSlider-valueLabel": {
                        fontSize: "0.60rem", // Giảm kích thước chữ trong label
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Box>
              </Tooltip>
              <Dialog open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)}>
                <Box width={400} height={200}>
                  <DialogTitle>Gắn Link</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Link URL"
                      type="url"
                      fullWidth
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setLinkDialogOpen(false)}>Hủy</Button>
                    <Button onClick={addLink}>Thêm Link</Button>
                  </DialogActions>
                </Box>
              </Dialog>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <Box width={400} height={200}>
                  <DialogTitle>Nhúng Video Youtube</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="YouTube URL"
                      type="url"
                      fullWidth
                      value={youtubeURL}
                      onChange={(e) => setYoutubeURL(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      Hủy
                    </Button>
                    <Button onClick={handleEmbedYoutube} color="primary">
                      Nhúng
                    </Button>
                  </DialogActions>
                </Box>
              </Dialog>
              <Dialog open={imageDialogOpen} onClose={handleCloseDialogImage}>
                <Box width={600} height={300}>
                  <DialogTitle>Thêm ảnh vào editor</DialogTitle>
                  <DialogContent>
                    <Stack direction={"row"} width="100%">
                      <Box width={"45%"} height={"100%"}>
                        <Stack direction="row" spacing={2}>
                          <Button
                            sx={{ width: 40, height: 30, minWidth: 0 }}
                            variant="outlined"
                            component="label"
                            style={{ marginLeft: "10px" }}
                          >
                            <DriveFolderUploadIcon />
                            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                          </Button>
                          <Box
                            component={"img"}
                            src={imageUrl.url || "/assets/products/empty.png"}
                            sx={{
                              height: 150,
                              width: 150,
                              objectFit: "cover",
                              objectPosition: "center",
                              border: "1px solid ",
                            }}
                          />
                        </Stack>
                      </Box>
                      <Stack width={"50%"}>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Alt Image"
                          type="text"
                          fullWidth
                          value={altImage}
                          onChange={(e) => setAltImage(e.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Title Image"
                          type="text"
                          fullWidth
                          value={titleImage}
                          multiline
                          onChange={(e) => setTitleImage(e.target.value)}
                        />
                      </Stack>
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialogImage} color="primary">
                      Hủy
                    </Button>
                    <Button onClick={handleClickEmbedImage} color="primary">
                      Nhúng
                    </Button>
                  </DialogActions>
                </Box>
              </Dialog>
            </div>
          </Box>
        )}
        {!isHtmlMode ? (
          <Box
            sx={{
              border: isBorderContent ? "1px solid #ddd" : "none",
              padding: isBorderContent ? "12px" : "0px",
              borderRadius: "12px",
              fontFamily: '"Arial", serif',
            }}
          >
            <TableOfContents
              editor={editor}
              isDisable={isDisable}
              onChangeContentEditor={onChangeContent}
              contentEditor={contentEditor}
              tocItems={tocItems}
              onChangeTocItems={setTocItems}
            />
            <StyledEditorContent
              ref={editorRef}
              editor={editor}
              height={height}
              onKeyDown={handleKeyDown}
              onClick={handleEditorClick}
            />
          </Box>
        ) : (
          <textarea
            value={contentEditor}
            onChange={handleHtmlChange}
            style={{
              width: "100%",
              height: height || "200px",
              border: "1px solid #ddd",
              padding: "10px",
              fontFamily: "monospace",
            }}
          />
        )}
        {/* <Box mt={2}>
                    <h3>Editor Content:</h3>
                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{contentEditor}</pre>
                </Box> */}
      </Scrollbar>
      {isDisable && !expand && (
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            padding: 1,
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e9e9e9",
            },
            mt: 2,
          }}
          onClick={() => {
            setExpendContent(!expendContent);
            if (expendContent) {
              window.scrollTo({
                top: 1500,
                behavior: "smooth",
              });
            }
          }}
        >
          <Stack direction="row" justifyContent="center" alignItems="center">
            {expendContent ? (
              <>
                <KeyboardDoubleArrowUpIcon />
                <Typography fontWeight={500} fontSize={14}>
                  Thu gọn
                </Typography>
              </>
            ) : (
              <>
                <KeyboardDoubleArrowDownIcon />
                <Typography fontWeight={500} fontSize={14}>
                  Xem thêm
                </Typography>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TiptapEditor;
