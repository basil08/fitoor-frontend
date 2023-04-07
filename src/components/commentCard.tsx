var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function CommentCard(props: any) {
    const comment = props.comment;

    return <>
        <div className="card p-2 rounded">
            <div className="card-title">
                <p>
                    <span className="fw-bold">
                        {comment.nickname}
                    </span>
                    <span>
                        | {dayjs(comment.timestamp).fromNow()}
                    </span>
                </p>
            </div>
            <div className="card-body">
                <p>{comment.text}</p>
            </div>
        </div>
    </>
}