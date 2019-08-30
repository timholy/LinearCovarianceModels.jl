var documenterSearchIndex = {"docs":
[{"location":"#Introduction-1","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"LinearCovarianceModels.jl is a package for computing Maximum Likelihood degrees of linear covariance models using numerical nonlinear algebra. In particular HomotopyContinuation.jl.","category":"page"},{"location":"#Introduction-by-Example-1","page":"Introduction","title":"Introduction by Example","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"# Create a linear covariance model\njulia> Σ = toeplitz(3)\n3-dimensional LCModel:\n θ₁  θ₂  θ₃\n θ₂  θ₁  θ₂\n θ₃  θ₂  θ₁\n\n# Compute a witness for the ML degree\njulia> W = ml_degree_witness(Σ)\n MLDegreeWitness:\n • ML degree → 3\n • model dimension → 3\n • dual → false\n\n# We offer the option to numerically verify the ML Degree\njulia> verify(W)\n Compute additional witnesses for completeness...\n Found 10 additional witnesses\n Found 10 additional witnesses\n Compute trace...\n Norm of trace: 2.6521474798326718e-12\n true\n\n# Consider the sample covariance matrix S\njulia> S = [4/5 -9/5 -1/25\n            -9/5 79/16 25/24\n            -1/25 25/24 17/16];\n\n# We use the ML degree witness set W to compute all critical points of the MLE\n# problem.\njulia> critical_points(W, S)\n3-element Array{Tuple{Array{Float64,1},Float64,Symbol},1}:\n ([2.39038, -0.286009, 0.949965], -5.421751313919751, :local_maximum)\n ([2.52783, -0.215929, -1.45229], -5.346601549034418, :global_maximum)\n ([2.28596, -0.256394, 0.422321], -5.424161999175718, :saddle_point)  \n\n# If we are just interested in the MLE, there is also a shorthand.\njulia> mle(W, S)\n3-element Array{Float64,1}:\n  2.527832268219689  \n -0.21592947057775033\n -1.4522862659134732","category":"page"},{"location":"#Linear-Covariance-Models-1","page":"Introduction","title":"Linear Covariance Models","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"The linear covariance models are wrapped in the LCModel type:","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"LCModel\nmodel\ndim","category":"page"},{"location":"#LinearCovarianceModels.LCModel","page":"Introduction","title":"LinearCovarianceModels.LCModel","text":"LCModel(Σ::Matrix{<:DP.AbstractPolynomialLike})\n\nCreate a linear covariance model from the parameterization Σ. This uses as input a matrix of polynomials created by the DynamicPolynomials package.\n\nExample\n\nusing DynamicPolynomials # load polynomials package\n\n# use DynamicPolynomials to create variables θ₁, θ₂, θ₃.\n@polyvar θ[1:3]\n\n# create our model as matrix of DynamicPolynomials\nΣ = [θ[1] θ[2] θ[3]; θ[2] θ[1] θ[2]; θ[3] θ[2] θ[1]]\n\n# create model\nmodel = LCModel(Σ)\n\n\n\n\n\n","category":"type"},{"location":"#LinearCovarianceModels.model","page":"Introduction","title":"LinearCovarianceModels.model","text":"model(W::MLDegreeWitness)\n\nObtain the model corresponding to the MLDegreeWitness W.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.dim","page":"Introduction","title":"LinearCovarianceModels.dim","text":"dim(M::LCModel)\n\nReturns the dimension of the model.\n\n\n\n\n\n","category":"function"},{"location":"#Default-models-1","page":"Introduction","title":"Default models","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"The following linear covariance models are provided by default","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"generic_subspace\ngeneric_diagonal\ntoeplitz\ntree\ntrees","category":"page"},{"location":"#LinearCovarianceModels.generic_subspace","page":"Introduction","title":"LinearCovarianceModels.generic_subspace","text":"generic_subspace(n::Integer, m::Integer); pos_def::Bool=true)\n\nGenerate a generic family of symmetric nn matrices living in an m-dimensional subspace. If pos_def is true then positive definite matrices are used as a basis.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.generic_diagonal","page":"Introduction","title":"LinearCovarianceModels.generic_diagonal","text":"generic_diagonal(n::Integer, m::Integer)\n\nGenerate a generic family of nn diagonal matrices living in an m-dimensional subspace.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.toeplitz","page":"Introduction","title":"LinearCovarianceModels.toeplitz","text":"toeplitz(n::Integer)\n\nReturns a symmetric n×n toeplitz matrix.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.tree","page":"Introduction","title":"LinearCovarianceModels.tree","text":"tree(n, id::String)\n\nGet the covariance matrix corresponding to the tree with the given id on n leaves. Returns nothing if the tree was not found.\n\nExample\n\njulia> tree(4, \"{{1, 2}, {3, 4}}\") 4×4 Array{PolyVar{true},2}:  t₁  t₅  t₇  t₇  t₅  t₂  t₇  t₇  t₇  t₇  t₃  t₆  t₇  t₇  t₆  t₄\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.trees","page":"Introduction","title":"LinearCovarianceModels.trees","text":"trees(n)\n\nReturn all trees with n leaves as a tuple (id, tree).\n\n\n\n\n\n","category":"function"},{"location":"#ML-Degree-1","page":"Introduction","title":"ML Degree","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"ml_degree_witness\nMLDegreeWitness\nml_degree\nparameters\nsolutions\nis_dual\nverify","category":"page"},{"location":"#LinearCovarianceModels.ml_degree_witness","page":"Introduction","title":"LinearCovarianceModels.ml_degree_witness","text":"ml_degree_witness(Σ::LCModel; ml_degree=nothing, max_tries=5, dual=false)\n\nCompute a MLDegreeWitness for a given model Σ. If the ML degree is already known it can be provided to stop the computations early. The stopping criterion is based on a heuristic, max_tries indicates how many different parameters are tried a most until an agreement is found.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.MLDegreeWitness","page":"Introduction","title":"LinearCovarianceModels.MLDegreeWitness","text":"MLDegreeWitness\n\nData structure holding an MLE model. This also holds a set of solutions for a generic instance, which we call a witness.\n\n\n\n\n\n","category":"type"},{"location":"#LinearCovarianceModels.ml_degree","page":"Introduction","title":"LinearCovarianceModels.ml_degree","text":"ml_degree(W::MLDegreeWitness)\n\nReturns the ML degree.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.parameters","page":"Introduction","title":"LinearCovarianceModels.parameters","text":"parameters(W::MLDegreeWitness)\n\nObtain the parameters of the MLDegreeWitness W.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.solutions","page":"Introduction","title":"LinearCovarianceModels.solutions","text":"solutions(W::MLDegreeWitness)\n\nObtain the witness solutions corresponding to the MLDegreeWitness W with given parameters.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.is_dual","page":"Introduction","title":"LinearCovarianceModels.is_dual","text":"is_dual(W::MLDegreeWitness)\n\nIndicates whether W is a witness for the dual MLE.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.verify","page":"Introduction","title":"LinearCovarianceModels.verify","text":"verify(W::MLDegreeWitness; trace_tol=1e-5, options...)\n\nTries to verify that the computed ML degree witness is complete, i.e., that the ML degree is correct. This uses the verify_solution_completeness of HomotopyContinuation.jl. All caveats mentioned there apply. The options are also passed to verify_solution_completeness.\n\n\n\n\n\n","category":"function"},{"location":"#Compute-MLE-for-specific-instances-1","page":"Introduction","title":"Compute MLE for specific instances","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"mle\ncritical_points\ncovariance_matrix\nlogl\ngradient_logl\nhessian_logl\nclassify_point","category":"page"},{"location":"#LinearCovarianceModels.mle","page":"Introduction","title":"LinearCovarianceModels.mle","text":"mle(W::MLDegreeWitness, S::AbstractMatrix; only_positive_definite=true, only_positive=false)\n\nCompute the MLE for the matrix S using the MLDegreeWitness W. Returns the parameters for the MLE covariance matrix or nothing if no solution was found satisfying the constraints (see options below).\n\nOptions\n\nonly_positive_definite: controls whether only positive definite\n\ncovariance matrices should be considered.\n\nonly_positive: controls whether only (entrywise) positive covariance matrices\n\nshould be considered.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.critical_points","page":"Introduction","title":"LinearCovarianceModels.critical_points","text":"critical_points(W::MLDegreeWitness, S::AbstractMatrix;\n        only_positive_definite=true, only_non_negative=false,\n        options...)\n\nCompute all critical points to the MLE problem of W for the given sample covariance matrix S. If only_positive_definite is true only positive definite solutions are considered. If only_non_negative is true only non-negative solutions are considered. The options are argument passed to the solve routine from HomotopyContinuation.jl.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.covariance_matrix","page":"Introduction","title":"LinearCovarianceModels.covariance_matrix","text":"covariance_matrix(M::LCModel, θ)\n\nCompute the covariance matrix corresponding to the value of θ and the given model M.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.logl","page":"Introduction","title":"LinearCovarianceModels.logl","text":"logl(M::LCModel, θ, S::AbstractMatrix)\n\nEvaluate the log-likelihood log(det(Σ¹)) - tr(SΣ¹) of the MLE problem.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.gradient_logl","page":"Introduction","title":"LinearCovarianceModels.gradient_logl","text":"gradient_logl(M::LCModel, θ, S::AbstractMatrix)\n\nEvaluate the gradient of the log-likelihood log(det(Σ¹)) - tr(SΣ¹) of the MLE problem.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.hessian_logl","page":"Introduction","title":"LinearCovarianceModels.hessian_logl","text":"hessian_logl(M::LCModel, θ, S::AbstractMatrix)\n\nEvaluate the hessian of the log-likelihood log(det(Σ¹)) - tr(SΣ¹) of the MLE problem.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.classify_point","page":"Introduction","title":"LinearCovarianceModels.classify_point","text":"classify_point(M::LCModel, θ, S::AbstractMatrix)\n\nClassify the critical point θ of the log-likelihood function.\n\n\n\n\n\n","category":"function"},{"location":"#Helper-functions-1","page":"Introduction","title":"Helper functions","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"sym_to_vec\nvec_to_sym","category":"page"},{"location":"#LinearCovarianceModels.sym_to_vec","page":"Introduction","title":"LinearCovarianceModels.sym_to_vec","text":"sym_to_vec(S)\n\nConverts a symmetric matrix S to a vector by filling the vector with lower triangular part iterating columnwise.\n\n\n\n\n\n","category":"function"},{"location":"#LinearCovarianceModels.vec_to_sym","page":"Introduction","title":"LinearCovarianceModels.vec_to_sym","text":"vec_to_sym(v)\n\nConverts a vector v to a symmetrix matrix by filling the lower triangular part columnwise.\n\nExample\n\njulia> v = [1,2,3, 4, 5, 6]; julia> vec_to_sym(v) 3×3 Array{Int64,2}:  1  2  3  2  4  5  3  5  6\n\n\n\n\n\n","category":"function"}]
}
