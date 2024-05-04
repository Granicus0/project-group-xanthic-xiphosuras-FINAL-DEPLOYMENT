def get_default_extra(model_type,problem_type):

    if problem_type=="catalogue":
        if model_type=="SVM":
            pass
        if model_type=="NN":
            return {"verbose":True}
        if model_type=="RF":
            pass
    elif problem_type=="numeric":
        if model_type=="SVM":
            pass
        if model_type=="NN":
            return {"verbose":True}
        if model_type=="RF":
            pass
    return {}