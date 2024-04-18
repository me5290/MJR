package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project1.model.dao.BoardDao;
import project1.model.dto.BoardDto;
import project1.model.dto.PageDto;
import project1.model.dto.ReplyDto;
import project1.service.BoardService;

import java.util.List;

@Controller
@RequestMapping("/board")
public class BoardController {//class start

// 담당자 전승호 Start====
    @Autowired
    BoardDao boardDao;
    @Autowired
    BoardService boardService;

    // 글목록(전체게시글) 호출
    @GetMapping("/list")
    public String boardList(){
        return "view/board/boardList";
    }
    // 글목록(전체게시글) 정보호출
    @GetMapping("/list.do")
    @ResponseBody
    public PageDto doBoardList(
            @RequestParam int page,
            @RequestParam int pageBoardSize,
            @RequestParam int categoryA,
            @RequestParam int categoryB,
            @RequestParam String key,
            @RequestParam String keyword){
        System.out.println("BoardController.doBoardList");


        return boardService.doBoardList(page,pageBoardSize,categoryA,categoryB,key,keyword);
    }

    // 글쓰기 페이지호출
    @GetMapping("/write")
    public String boardWrite(){
        System.out.println("BoardController.boardWrite");

        return "view/board/boardWrite";
    }
    // 글쓰기내용 등록
    @PostMapping("/create")
    @ResponseBody
    public int doWrite(BoardDto boardWriteFormData){
        System.out.println("boardWriteFormData = " + boardWriteFormData);

        return boardService.doWrite(boardWriteFormData);
    }

    // 개별글 내용호출 dto
    @GetMapping("/oneview.do")
    @ResponseBody
    public BoardDto doOneview(@RequestParam int bno){
        System.out.println("BoardController.oneview 실행됨");

        return boardService.oneview(bno);
    }

    // 개별글 페이지 호출
    @GetMapping("/oneview")
    public String oneview(@RequestParam int bno){
        System.out.println("BoardController.oneview");
        return "view/board/oneview";
    }

    // 개별글 수정페이지 호출
    @GetMapping("/update")
    public String updatePage(){
        System.out.println("BoardController.updatePage");
        return "/view/board/boardUpdate";
    }
    
    // 개시글 수정요청
    @PutMapping("/update.do")
    @ResponseBody
    public int doBoardUpdate(BoardDto boardUpdateForm){
        System.out.println("BoardController.doBoardUpdate");
        System.out.println("boardUpdateForm = " + boardUpdateForm);

        return boardService.doBoardUpdate(boardUpdateForm);
    }

    // 개시글 삭제요청
    @DeleteMapping("/delete.do")
    @ResponseBody
    public boolean doBoardDelete(@RequestParam int bno){
        System.out.println("bno = " + bno);

        System.out.println("BoardController.doBoardDelete");
        return boardService.doBoardDelete(bno);
    }
    // 인기글 호출
    @GetMapping("/bestlist.do")
    @ResponseBody
    public PageDto doBestList(
            @RequestParam int page,
            @RequestParam int pageBoardSize,
            @RequestParam int categoryA,
            @RequestParam int categoryB,
            @RequestParam String key,
            @RequestParam String keyword){
        return boardService.doBestList(page,pageBoardSize,categoryA,categoryB,key,keyword);
    }
// 댓글라인 ========================================================
    // 댓글 내용 호출하기
    @GetMapping("/replyView.do")
    @ResponseBody
    public List<ReplyDto> doReplyView(@RequestParam int bno){
        System.out.println("BoardController.doReplyView");

        return boardService.doReplyView(bno);
    }

    // 댓글 작성처리
    @PostMapping("/replyWrite")
    @ResponseBody
    public int doReplyWrite(@RequestParam int bno ,@RequestParam String rpcontent){
        System.out.println("BoardController.replyWrite");

        System.out.println("bno = " + bno);
        System.out.println("rpcontent = " + rpcontent);

        return boardService.doReplyWrite(bno,rpcontent);
    }

    // 댓글 삭제처리    반환 : boolean
    @DeleteMapping("/replydelete")
    @ResponseBody
    public boolean doReplyDelet(@RequestParam int rpno){
        System.out.println("BoardController.doReplyDelet");

        return boardService.doReplyDelet(rpno);
    }


// 담당자 전승호 END====
}//class end
