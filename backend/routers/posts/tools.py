from database.models import Like

def add_like(db, post_id, user_id):
    like = Like(
        user_id=user_id,
        post_id=post_id
        )
    db.add(like)
    db.commit()
    db.flush()
    
def remove_like(db, like):
    db.delete(like)
    db.commit()
    db.flush()